import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import { Clock, Search, Ticket, CheckCircle, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { Order } from '../../types';

export default function AdminOrders() {
  const { orders, fetchOrders } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundingOrder, setRefundingOrder] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState('');

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter || o.payStatus === statusFilter)
    : orders;

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (order: typeof orders[0]) => {
    if (order.payStatus === 'refunded') return { bg: 'bg-gray-100', text: 'text-gray-600', label: '已退款' };
    if (order.status === 'used') return { bg: 'bg-green-100', text: 'text-green-600', label: '已完成' };
    if (order.status === 'cancelled') return { bg: 'bg-red-100', text: 'text-red-600', label: '已取消' };
    if (order.payStatus === 'pending') return { bg: 'bg-yellow-100', text: 'text-yellow-600', label: '待支付' };
    return { bg: 'bg-blue-100', text: 'text-blue-600', label: '待使用' };
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.payStatus === 'pending').length,
    completed: orders.filter((o) => o.status === 'used').length,
    revenue: orders.filter((o) => o.payStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const handleConfirmPayment = async (order: Order) => {
    const res = await fetch(`/api/orders/${order.id}/pay`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      await fetchOrders();
      setMessage('支付确认成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('操作失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelOrder = async (order: Order) => {
    const res = await fetch(`/api/orders/${order.id}/cancel`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      await fetchOrders();
      setMessage('订单已取消');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('操作失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRefund = async () => {
    if (!refundingOrder) return;
    const res = await fetch(`/api/orders/${refundingOrder.id}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: refundReason }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchOrders();
      setShowRefundModal(false);
      setRefundingOrder(null);
      setRefundReason('');
      setMessage('退款申请已提交');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('操作失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const openRefundModal = (order: Order) => {
    setRefundingOrder(order);
    setRefundReason('');
    setShowRefundModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
            <p className="text-sm text-gray-500">查看和处理订单</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">订单总数</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">待支付</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">已完成</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">总营收</p>
            <p className="text-2xl font-bold text-primary-600">¥{stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                !statusFilter ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              待支付
            </button>
            <button
              onClick={() => setStatusFilter('used')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === 'used' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              已完成
            </button>
            <button
              onClick={() => setStatusFilter('refunded')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === 'refunded' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              已退款
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">订单号</th>
                <th className="px-6 py-4 font-medium">会员</th>
                <th className="px-6 py-4 font-medium">票种</th>
                <th className="px-6 py-4 font-medium">金额</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">时间</th>
                <th className="px-6 py-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order);
                return (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm">{order.orderNo}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.memberName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-primary-500" />
                        <span className="text-sm">{order.items.map((i) => i.ticketName).join(', ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">¥{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {order.status === 'pending' && order.payStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirmPayment(order)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="确认支付"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="取消订单"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {order.payStatus === 'paid' && order.status === 'pending' && (
                          <button
                            onClick={() => openRefundModal(order)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                            title="退款"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无订单数据</p>
            </div>
          )}
        </div>
      </main>

      {/* Refund Modal */}
      {showRefundModal && refundingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">申请退款</h2>
              <button onClick={() => { setShowRefundModal(false); setRefundingOrder(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">退款说明</p>
                  <p className="text-xs text-orange-600 mt-1">此操作将提交退款申请，款项将原路退回至支付账户</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">订单号</p>
                <p className="font-medium font-mono">{refundingOrder.orderNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">退款金额</p>
                <p className="text-xl font-bold text-accent-600">¥{refundingOrder.totalAmount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">退款原因</label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入退款原因"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowRefundModal(false); setRefundingOrder(null); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleRefund}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                提交退款申请
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
