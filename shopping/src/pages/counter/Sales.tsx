import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { formatPrice } from '../../lib/utils';
import { Ticket, Minus, Plus, CreditCard, Smartphone, Banknote } from 'lucide-react';

export default function CounterSales() {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [memberPhone, setMemberPhone] = useState('');

  // 模拟票种数据
  const tickets = [
    { id: '1', name: '单人日场票', price: 128, stock: 500 },
    { id: '2', name: '双人情侣票', price: 218, stock: 100 },
    { id: '3', name: '家庭套票', price: 298, stock: 80 },
    { id: '4', name: '夜场票', price: 88, stock: 300 },
  ];

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setQuantity(1);
  };

  const handlePayment = async (method: string) => {
    toast.success(`${method === 'wechat' ? '微信' : method === 'alipay' ? '支付宝' : '现金'}支付成功`);
    setShowPayment(false);
    setSelectedTicket(null);
    setQuantity(1);
  };

  const handleMemberSearch = () => {
    if (memberPhone.length !== 11) {
      toast.error('请输入正确的手机号');
      return;
    }
    toast.success('会员识别成功：张三（金卡会员）');
    setShowMember(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">门票销售</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowMember(true)}
              className="px-3 py-1 bg-white/20 rounded-full text-sm"
            >
              会员识别
            </button>
            <button onClick={() => navigate('/counter')} className="text-sm">
              返回
            </button>
          </div>
        </div>
      </div>

      {/* 票种列表 */}
      <div className="p-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">选择票种</h2>
        <div className="grid grid-cols-2 gap-3">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedTicket?.id === ticket.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-medium text-gray-900 text-center">{ticket.name}</h3>
              <p className="text-lg font-bold text-purple-600 text-center mt-2">
                {formatPrice(ticket.price)}
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">库存: {ticket.stock}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 已选票种 */}
      {selectedTicket && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-gray-900">{selectedTicket.name}</h3>
              <p className="text-sm text-gray-500">单价: {formatPrice(selectedTicket.price)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500">合计: </span>
              <span className="text-xl font-bold text-red-600">
                {formatPrice(selectedTicket.price * quantity)}
              </span>
            </div>
            <Button onClick={() => setShowPayment(true)}>
              立即结算
            </Button>
          </div>
        </div>
      )}

      {/* 支付方式弹窗 */}
      <Modal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        title="选择支付方式"
      >
        <div className="space-y-3">
          <div className="text-center mb-4">
            <p className="text-gray-500">支付金额</p>
            <p className="text-3xl font-bold text-red-600">
              {formatPrice((selectedTicket?.price || 0) * quantity)}
            </p>
          </div>
          <button
            onClick={() => handlePayment('wechat')}
            className="w-full flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Smartphone className="w-6 h-6 text-green-600" />
            <span className="font-medium">微信支付</span>
          </button>
          <button
            onClick={() => handlePayment('alipay')}
            className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CreditCard className="w-6 h-6 text-blue-600" />
            <span className="font-medium">支付宝</span>
          </button>
          <button
            onClick={() => handlePayment('cash')}
            className="w-full flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <Banknote className="w-6 h-6 text-yellow-600" />
            <span className="font-medium">现金支付</span>
          </button>
        </div>
      </Modal>

      {/* 会员识别弹窗 */}
      <Modal
        isOpen={showMember}
        onClose={() => setShowMember(false)}
        title="会员识别"
      >
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="请输入会员手机号"
            value={memberPhone}
            onChange={(e) => setMemberPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            maxLength={11}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setShowMember(false)}
              variant="outline"
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={handleMemberSearch}
              className="flex-1"
            >
              识别
            </Button>
          </div>
        </div>
      </Modal>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/counter')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <Ticket className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">售票</span>
          </button>
          <button onClick={() => navigate('/counter/cashier')} className="flex flex-col items-center gap-1 text-gray-500">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">收银</span>
          </button>
          <button onClick={() => navigate('/counter/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
