import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { MapPin, Square, Phone, ChevronRight, X, Building2 } from 'lucide-react';
import { useState } from 'react';
import type { Investment } from '../../types';

export default function H5Investment() {
  const { investments } = useStore();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [message, setMessage] = useState('');

  const formatPrice = (price?: number) => price ? `¥${price.toLocaleString()}/月` : '面议';

  const handleConsult = () => {
    setMessage('客服热线：400-888-8888');
    setTimeout(() => setMessage(''), 3000);
  };

  const openDetailModal = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowDetailModal(true);
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
        <h1 className="text-lg font-bold">招商信息</h1>
        <p className="text-xs text-primary-200">优质商铺招租中</p>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-accent-400 to-accent-500 p-6 text-white">
        <h2 className="text-xl font-bold mb-2">黄金位置 火热招商</h2>
        <p className="text-sm text-white/80 mb-4">涵盖零售、餐饮、娱乐等多种业态</p>
        <button
            onClick={handleConsult}
            className="px-6 py-2 bg-white text-accent-600 rounded-full text-sm font-medium flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            立即咨询
          </button>
      </div>

      {/* Investments List */}
      <div className="p-4 space-y-4">
        <h3 className="font-bold text-gray-800">推荐商铺</h3>
        {investments.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <span className="text-sm text-primary-600 font-medium">{item.assetName}</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Square className="w-4 h-4" />
                  <span>{item.area}㎡</span>
                </div>
                {item.expectedRent && (
                  <div className="flex items-center gap-1 text-sm text-accent-500">
                    <span className="font-medium">{formatPrice(item.expectedRent)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'available' ? 'bg-green-100 text-green-600' :
                  item.status === 'reserved' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.status === 'available' ? '可租' : item.status === 'reserved' ? '预留中' : '已出租'}
                </span>
                <button
                    onClick={() => openDetailModal(item)}
                    className="text-primary-500 text-sm font-medium flex items-center gap-1"
                  >
                    了解更多
                    <ChevronRight className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </div>
        ))}
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
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
          </svg>
          <span className="text-xs mt-1">票务</span>
        </Link>
        <Link to="/h5/my-tickets" className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span className="text-xs mt-1">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>

      {/* Detail Modal */}
      {showDetailModal && selectedInvestment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">商铺详情</h2>
              <button onClick={() => { setShowDetailModal(false); setSelectedInvestment(null); }} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-4 flex items-center justify-center">
              <div className="text-center">
                <Building2 className="w-10 h-10 text-primary-400 mx-auto mb-2" />
                <span className="text-sm text-primary-600 font-medium">{selectedInvestment.assetName}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">商铺名称</p>
                <p className="font-medium">{selectedInvestment.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500">面积</p>
                  <p className="font-medium">{selectedInvestment.area}㎡</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">租金</p>
                  <p className="font-medium text-accent-500">{formatPrice(selectedInvestment.expectedRent)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">状态</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  selectedInvestment.status === 'available' ? 'bg-green-100 text-green-600' :
                  selectedInvestment.status === 'reserved' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {selectedInvestment.status === 'available' ? '可租' : selectedInvestment.status === 'reserved' ? '预留中' : '已出租'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">描述</p>
                <p className="text-sm text-gray-600">{selectedInvestment.description}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowDetailModal(false); setSelectedInvestment(null); }}
                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium"
              >
                关闭
              </button>
              <button
                onClick={() => { handleConsult(); setShowDetailModal(false); setSelectedInvestment(null); }}
                className="flex-1 py-2 bg-primary-500 text-white rounded-xl font-medium"
              >
                立即咨询
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
