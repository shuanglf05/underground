import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  Ticket, ChevronRight, QrCode, Clock, 
  CheckCircle, XCircle, Calendar, CreditCard 
} from 'lucide-react';

export default function MyTickets() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useStore();
  const [activeTab, setActiveTab] = useState('unused');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: 1,
      name: '单人日场票',
      price: 128,
      validDate: '2024-01-20',
      status: 'unused',
      qrCode: 'ORD202401150001',
      type: 'single',
    },
    {
      id: 2,
      name: '家庭套票',
      price: 298,
      validDate: '2024-01-18',
      status: 'used',
      qrCode: 'ORD202401100002',
      type: 'package',
    },
    {
      id: 3,
      name: '周末通票',
      price: 198,
      validDate: '2024-01-10',
      status: 'expired',
      qrCode: 'ORD202401050003',
      type: 'unified',
    },
    {
      id: 4,
      name: 'VR体验票',
      price: 79,
      validDate: '2024-01-25',
      status: 'unused',
      qrCode: 'ORD202401180004',
      type: 'single',
    },
  ];

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">请先登录查看门票</p>
          <Button onClick={() => navigate('/user/login')}>立即登录</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/user')} className="text-white/80">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-lg font-bold">我的门票</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white px-4 py-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('unused')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'unused' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>未使用</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'unused' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {tickets.filter(t => t.status === 'unused').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('used')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'used' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>已使用</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'used' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {tickets.filter(t => t.status === 'used').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'expired' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>已过期</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'expired' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {tickets.filter(t => t.status === 'expired').length}
          </span>
        </button>
      </div>

      {/* 门票列表 */}
      <div className="px-4 py-4 space-y-3">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Ticket className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{ticket.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      ticket.status === 'unused' ? 'bg-green-100 text-green-600' :
                      ticket.status === 'used' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {ticket.status === 'unused' ? '未使用' :
                       ticket.status === 'used' ? '已使用' : '已过期'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {ticket.validDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      ¥{ticket.price}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无{activeTab === 'unused' ? '未使用' : activeTab === 'used' ? '已使用' : '已过期'}的门票</p>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/user')} className="flex flex-col items-center gap-1 text-gray-500">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/user/tickets')} className="flex flex-col items-center gap-1 text-gray-500">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">购票</span>
          </button>
          <button onClick={() => navigate('/user/my-tickets')} className="flex flex-col items-center gap-1 text-blue-600">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">门票</span>
          </button>
        </div>
      </div>

      {/* 门票详情弹窗 */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="门票详情"
        size="lg"
      >
        {selectedTicket && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedTicket.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  selectedTicket.status === 'unused' ? 'bg-green-400' :
                  selectedTicket.status === 'used' ? 'bg-blue-400' :
                  'bg-gray-400'
                }`}>
                  {selectedTicket.status === 'unused' ? '未使用' :
                   selectedTicket.status === 'used' ? '已使用' : '已过期'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-80">订单编号</p>
                  <p className="font-bold">{selectedTicket.qrCode}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">价格</p>
                  <p className="font-bold">¥{selectedTicket.price}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm opacity-80">有效期至</p>
                <p className="font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedTicket.validDate}
                </p>
              </div>
            </div>

            {selectedTicket.status === 'unused' && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center py-4">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center shadow-inner">
                    <QrCode className="w-20 h-20 text-gray-800" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">扫码验票</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">票种类型</span>
                <span className="text-gray-900">{selectedTicket.type === 'unified' ? '通票' : selectedTicket.type === 'package' ? '套餐' : '单票'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">购买时间</span>
                <span className="text-gray-900">2024-01-15 10:30</span>
              </div>
            </div>

            {selectedTicket.status === 'unused' && (
              <Button className="w-full mt-4">申请退票</Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}