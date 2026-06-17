import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { ClipboardList, Search, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const orders = [
    { id: 'ORD20240115001', customer: '138****8888', ticketName: '单人日场票', quantity: 2, amount: 256, status: 'completed', createTime: '2024-01-15 10:30', channel: '微信小程序' },
    { id: 'ORD20240115002', customer: '139****9999', ticketName: '家庭套票', quantity: 1, amount: 298, status: 'completed', createTime: '2024-01-15 11:20', channel: '服务台' },
    { id: 'ORD20240115003', customer: '137****7777', ticketName: '双人情侣票', quantity: 1, amount: 218, status: 'pending', createTime: '2024-01-15 14:15', channel: '美团' },
    { id: 'ORD20240115004', customer: '136****6666', ticketName: '年卡会员', quantity: 1, amount: 998, status: 'completed', createTime: '2024-01-15 15:30', channel: '服务台' },
    { id: 'ORD20240115005', customer: '135****5555', ticketName: '单人夜场票', quantity: 3, amount: 264, status: 'refunding', createTime: '2024-01-15 16:00', channel: '微信小程序' },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.includes(searchTerm)
  );

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string; icon: React.ElementType }> = {
      completed: { text: '已完成', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { text: '待支付', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      refunding: { text: '退款中', className: 'bg-blue-100 text-blue-800', icon: Clock },
      cancelled: { text: '已取消', className: 'bg-red-100 text-red-800', icon: XCircle },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800', icon: Clock };
  };

  const handleViewDetail = (order: any) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">订单管理</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          导出订单
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索订单号或手机号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">订单号</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">客户</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">数量</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">金额</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">渠道</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.ticketName}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4 font-medium">¥{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{order.channel}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded ${statusInfo.className}`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{order.createTime}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`订单详情: ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">客户</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">渠道</p>
                  <p className="font-medium">{selectedOrder.channel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">票种</p>
                  <p className="font-medium">{selectedOrder.ticketName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">数量</p>
                  <p className="font-medium">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">金额</p>
                  <p className="font-medium text-lg text-red-600">¥{selectedOrder.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">下单时间</p>
                  <p className="font-medium">{selectedOrder.createTime}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowDetailModal(false)} variant="outline">关闭</Button>
              {selectedOrder.status === 'pending' && (
                <Button onClick={() => { toast.success('订单已取消'); setShowDetailModal(false); }} className="bg-red-600">取消订单</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}