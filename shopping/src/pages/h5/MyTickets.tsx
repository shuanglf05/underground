import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket as TicketIcon, Calendar, QrCode, Clock, ChevronRight, X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { Order } from '../../types';

export default function H5MyTickets() {
  const { orders, fetchOrders } = useStore();
  const navigate = useNavigate();
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [message, setMessage] = useState('');

  const paidOrders = orders.filter((o) => o.payStatus === 'paid');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusInfo = (status: string, payStatus: string) => {
    if (payStatus === 'refunded') return { text: '已退款', color: 'text-gray-400', bg: 'bg-gray-100' };
    if (status === 'used') return { text: '已使用', color: 'text-green-600', bg: 'bg-green-100' };
    if (status === 'cancelled') return { text: '已取消', color: 'text-red-600', bg: 'bg-red-100' };
    return { text: '待使用', color: 'text-blue-600', bg: 'bg-blue-100' };
  };

  const openQrModal = (order: Order) => {
    setSelectedOrder(order);
    setShowQrModal(true);
  };

  const openRefundModal = (order: Order) => {
    setSelectedOrder(order);
    setRefundReason('');
    setShowRefundModal(true);
  };

  const handleRefund = async () => {
    if (!selectedOrder) return;
    const res = await fetch(`/api/orders/${selectedOrder.id}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: refundReason }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchOrders();
      setShowRefundModal(false);
      setSelectedOrder(null);
      setRefundReason('');
      setMessage('退款申请已提交');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('退款失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Header */}
      <header className="bg-primary-500 text-white p-4 sticky top-0 z-50">
        <h1 className="text-lg font-bold">我的门票</h1>
        <p className="text-xs text-primary-200">查看您的电子门票</p>
      </header>

      {/* Tickets List */}
      <div className="p-4 space-y-4">
        {paidOrders.length === 0 ? (
          <div className="text-center py-12">
            <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无门票</p>
            <Link
              to="/h5/tickets"
              className="inline-block mt-4 px-6 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
            >
              去购票
            </Link>
          </div>
        ) : (
          paidOrders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status, order.payStatus);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary-200">订单号</p>
                      <p className="font-mono text-sm">{order.orderNo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      {statusInfo.text}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center">
                        <TicketIcon className="w-8 h-8 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.ticketName}</h3>
                        <p className="text-sm text-gray-400">x{item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  ))}

                  {order.status === 'pending' && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => openQrModal(order)}
                        className="flex-1 py-3 bg-primary-50 text-primary-600 rounded-xl font-medium flex items-center justify-center gap-2"
                      >
                        <QrCode className="w-5 h-5" />
                        出示二维码
                      </button>
                      <button
                        onClick={() => openRefundModal(order)}
                        className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium"
                      >
                        退款
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-around items-center">
        <Link to="/h5/home" className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs mt-1">首页</span>
        </Link>
        <Link to="/h5/tickets" className="flex flex-col items-center text-gray-400">
          <TicketIcon className="w-6 h-6" />
          <span className="text-xs mt-1">票务</span>
        </Link>
        <Link to="/h5/my-tickets" className="flex flex-col items-center text-primary-500">
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>

      {/* QR Code Modal */}
      {showQrModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">电子票二维码</h2>
              <button onClick={() => { setShowQrModal(false); setSelectedOrder(null); }} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 mb-4">
              <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-2" style={{ backgroundImage: `url(https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(selectedOrder.orderNo)})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                  <p className="text-xs text-gray-500 font-mono">{selectedOrder.orderNo}</p>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>请向工作人员出示此二维码核销</p>
              <p className="text-xs mt-1 text-gray-400">订单号: {selectedOrder.orderNo}</p>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">申请退款</h2>
              <button onClick={() => { setShowRefundModal(false); setSelectedOrder(null); }} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm text-orange-700">退款将原路退回至支付账户</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">订单号</p>
                <p className="font-mono text-sm">{selectedOrder.orderNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">退款金额</p>
                <p className="text-xl font-bold text-accent-600">¥{selectedOrder.totalAmount}</p>
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
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowRefundModal(false); setSelectedOrder(null); }}
                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium"
              >
                取消
              </button>
              <button
                onClick={handleRefund}
                className="flex-1 py-2 bg-orange-500 text-white rounded-xl font-medium"
              >
                提交申请
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
