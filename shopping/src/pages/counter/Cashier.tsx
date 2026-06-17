import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { formatPrice } from '../../lib/utils';
import { ShoppingCart, Minus, Plus, CreditCard, Smartphone, Banknote, Ticket, User, ChevronUp, ChevronDown } from 'lucide-react';

export default function CounterCashier() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '矿泉水', price: 3, quantity: 2 },
    { id: 2, name: '爆米花', price: 15, quantity: 1 },
  ]);
  const [showPayment, setShowPayment] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(true);

  const addItem = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async (method: string) => {
    toast.success(`${method === 'wechat' ? '微信' : method === 'alipay' ? '支付宝' : '现金'}支付成功`);
    setShowPayment(false);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter')} className="text-white/80">
            返回
          </button>
          <h1 className="text-lg font-bold">商品收银</h1>
          <button className="text-sm">
            <Ticket className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 商品分类 */}
      <div className="bg-white px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          {['全部', '饮料', '零食', '日用品', '礼品'].map((category, index) => (
            <button
              key={index}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                index === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 101, name: '矿泉水', price: 3, icon: 'water' },
            { id: 102, name: '可乐', price: 6, icon: 'cola' },
            { id: 103, name: '爆米花', price: 15, icon: 'popcorn' },
            { id: 104, name: '薯片', price: 10, icon: 'chips' },
            { id: 105, name: '冰淇淋', price: 12, icon: 'ice' },
            { id: 106, name: '热狗', price: 10, icon: 'hotdog' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const existing = cartItems.find(i => i.id === item.id);
                if (existing) {
                  addItem(item.id);
                } else {
                  setCartItems([...cartItems, { ...item, quantity: 1 }]);
                }
                toast.success(`已添加 ${item.name}`);
              }}
              className="bg-white rounded-lg p-3 text-center hover:bg-purple-50 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-lg font-bold text-purple-600">{formatPrice(item.price)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 购物车 */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4">
          {/* 购物车头部 - 可折叠 */}
          <div 
            className="flex items-center justify-between py-3 cursor-pointer"
            onClick={() => setCartExpanded(!cartExpanded)}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">购物车 ({cartItems.length})</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-red-600">{formatPrice(totalAmount)}</span>
              {cartExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
          
          {/* 购物车内容 */}
          {cartExpanded && (
            <div className="pb-3">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => addItem(item.id)}
                        className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-gray-600 font-medium w-16 text-right">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Button onClick={() => setShowPayment(true)} className="w-full">结算</Button>
              </div>
            </div>
          )}
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
            <p className="text-3xl font-bold text-red-600">{formatPrice(totalAmount)}</p>
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

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/counter')} className="flex flex-col items-center gap-1 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/counter/sales')} className="flex flex-col items-center gap-1 text-gray-500">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">售票</span>
          </button>
          <button onClick={() => navigate('/counter/cashier')} className="flex flex-col items-center gap-1 text-purple-600">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">收银</span>
          </button>
          <button onClick={() => navigate('/counter/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}