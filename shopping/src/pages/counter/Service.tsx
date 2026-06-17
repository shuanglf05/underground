import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { HelpCircle, Ticket, FileText, MessageCircle, Phone, User, ArrowLeft } from 'lucide-react';

export default function CounterService() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ticket');
  const [searchValue, setSearchValue] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = [
    { id: 'ORD20240115001', phone: '138****8888', name: '单人日场票', status: 'unused', time: '2024-01-15 10:30', amount: 128 },
    { id: 'ORD20240115002', phone: '139****9999', name: '家庭套票', status: 'used', time: '2024-01-15 09:15', amount: 298 },
    { id: 'ORD20240114003', phone: '137****7777', name: '双人情侣票', status: 'refunded', time: '2024-01-14 14:20', amount: 218 },
  ];

  const handleSearch = () => {
    if (!searchValue) {
      toast.error('请输入手机号或订单号');
      return;
    }
    const found = orders.find(o => o.phone.includes(searchValue) || o.id.includes(searchValue));
    if (found) {
      setSelectedOrder(found);
      toast.success('查询成功');
    } else {
      toast.error('未找到相关订单');
    }
  };

  const handleRefund = () => {
    toast.success('退票成功，金额将原路退回');
    setShowRefundModal(false);
    setSelectedOrder(null);
  };

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string }> = {
      unused: { text: '未使用', className: 'bg-yellow-100 text-yellow-800' },
      used: { text: '已使用', className: 'bg-green-100 text-green-800' },
      refunded: { text: '已退款', className: 'bg-red-100 text-red-800' },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">客户服务</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('ticket')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'ticket' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>门票查询</span>
        </button>
        <button
          onClick={() => setActiveTab('order')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'order' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>订单详情</span>
        </button>
        <button
          onClick={() => setActiveTab('help')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'help' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>使用帮助</span>
        </button>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        {activeTab === 'ticket' && (
          <>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="请输入手机号或订单号"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button onClick={handleSearch}>查询</Button>
            </div>

            {selectedOrder && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">订单号</span>
                  <span className="font-medium">{selectedOrder.id}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">手机号</span>
                  <span className="font-medium">{selectedOrder.phone}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">票种</span>
                  <span className="font-medium">{selectedOrder.name}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">金额</span>
                  <span className="font-bold text-red-600">¥{selectedOrder.amount}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">时间</span>
                  <span className="font-medium">{selectedOrder.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">状态</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusInfo(selectedOrder.status).className}`}>
                    {getStatusInfo(selectedOrder.status).text}
                  </span>
                </div>

                {selectedOrder.status === 'unused' && (
                  <Button onClick={() => setShowRefundModal(true)} className="w-full mt-4 bg-red-600 hover:bg-red-700">
                    申请退票
                  </Button>
                )}
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">最近订单</h3>
              <div className="space-y-2">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-xs text-gray-500">{order.phone} · {order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">¥{order.amount}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusInfo(order.status).className}`}>
                        {getStatusInfo(order.status).text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'order' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="请输入订单号"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button onClick={handleSearch} className="w-full">查询订单</Button>
            
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-gray-900 mb-2">订单查询说明</h3>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 可通过手机号或订单号查询</li>
                <li>• 订单号格式：ORD+日期+序号</li>
                <li>• 支持模糊查询（输入后4位手机号）</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">门票使用</h3>
              <p className="text-sm text-blue-700">凭二维码或手环在闸机处验证入场，单次有效</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">手环消费</h3>
              <p className="text-sm text-green-700">手环可在场内各消费点使用，余额不足可充值</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-2">退票政策</h3>
              <p className="text-sm text-yellow-700">未使用门票可在有效期内申请退票，收取10%手续费</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">联系我们</h3>
              <p className="text-sm text-purple-700">服务热线：400-888-8888</p>
              <p className="text-sm text-purple-700">服务时间：9:00-21:00</p>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        title="申请退票"
      >
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">订单号</span>
              <span className="font-medium">{selectedOrder?.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">票种</span>
              <span className="font-medium">{selectedOrder?.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">原金额</span>
              <span className="font-medium">¥{selectedOrder?.amount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">手续费(10%)</span>
              <span className="font-medium">¥{(selectedOrder?.amount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-red-200">
              <span className="font-bold">应退金额</span>
              <span className="font-bold text-xl text-green-600">¥{(selectedOrder?.amount * 0.9).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">退款将在3-7个工作日内原路退回</p>
          <div className="flex gap-2">
            <Button onClick={() => setShowRefundModal(false)} variant="outline">取消</Button>
            <Button onClick={handleRefund} className="bg-red-600">确认退票</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}