import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { ShoppingCart, Plus, Minus, CreditCard, QrCode, ArrowLeft } from 'lucide-react';

export default function ServiceAddOrder() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const products = [
    { id: '1', name: '足浴加钟(30分钟)', price: 68, category: '服务' },
    { id: '2', name: '矿泉水', price: 3, category: '饮品' },
    { id: '3', name: '可乐', price: 5, category: '饮品' },
    { id: '4', name: '薯片', price: 8, category: '零食' },
    { id: '5', name: '爆米花', price: 12, category: '零食' },
    { id: '6', name: 'VR体验(15分钟)', price: 45, category: '服务' },
    { id: '7', name: '台球加时(1小时)', price: 30, category: '服务' },
    { id: '8', name: '果汁', price: 10, category: '饮品' },
  ];

  const categories = ['全部', ...new Set(products.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredProducts = activeCategory === '全部' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addItem = (product: any) => {
    const existing = selectedItems.find(item => item.id === product.id);
    if (existing) {
      setSelectedItems(selectedItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: string) => {
    const existing = selectedItems.find(item => item.id === productId);
    if (existing && existing.quantity > 1) {
      setSelectedItems(selectedItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setSelectedItems(selectedItems.filter(item => item.id !== productId));
    }
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = (method: string) => {
    toast.success(`${method === 'wechat' ? '微信' : '支付宝'}支付成功`);
    setShowPayment(false);
    setSelectedItems([]);
    setQrCode('');
  };

  const handleScan = () => {
    setQrCode('QR' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
    toast.info('已扫描顾客手环/门票');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/service')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">现场加购</h1>
          <button onClick={handleScan} className="flex items-center gap-1">
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {qrCode && (
        <div className="bg-green-50 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700">已识别顾客</p>
            <p className="font-medium text-green-900">顾客ID: {qrCode}</p>
          </div>
          <button onClick={() => setQrCode('')} className="text-sm text-green-600">清除</button>
        </div>
      )}

      <div className="bg-white px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">商品列表</h2>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const selected = selectedItems.find(item => item.id === product.id);
            return (
              <div
                key={product.id}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selected ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-lg font-bold text-green-600 mt-1">¥{product.price}</p>
                {selected ? (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => removeItem(product.id)}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{selected.quantity}</span>
                    <button
                      onClick={() => addItem(product)}
                      className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addItem(product)}
                    className="w-full mt-2 py-2 bg-green-100 text-green-600 rounded-lg text-sm"
                  >
                    添加
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500">已选 {selectedItems.reduce((sum, item) => sum + item.quantity, 0)} 件商品</span>
            <button onClick={() => setSelectedItems([])} className="text-sm text-gray-500">清空</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500">合计: </span>
              <span className="text-xl font-bold text-red-600">¥{totalAmount}</span>
            </div>
            <Button onClick={() => setShowPayment(true)}>
              结算
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        title="选择支付方式"
      >
        <div className="space-y-3">
          <div className="text-center mb-4">
            <p className="text-gray-500">支付金额</p>
            <p className="text-3xl font-bold text-red-600">¥{totalAmount}</p>
          </div>
          <button
            onClick={() => handlePayment('wechat')}
            className="w-full flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100"
          >
            <CreditCard className="w-6 h-6 text-green-600" />
            <span className="font-medium">微信支付</span>
          </button>
          <button
            onClick={() => handlePayment('alipay')}
            className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <CreditCard className="w-6 h-6 text-blue-600" />
            <span className="font-medium">支付宝</span>
          </button>
          <button
            onClick={() => handlePayment('bracelet')}
            className="w-full flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
          >
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            <span className="font-medium">手环支付</span>
          </button>
        </div>
      </Modal>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/service')} className="flex flex-col items-center gap-1 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">加购</span>
          </button>
          <button onClick={() => navigate('/service/workorders')} className="flex flex-col items-center gap-1 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}