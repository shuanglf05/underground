import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Loading } from '../../components/ui/Loading';
import { formatPrice } from '../../lib/utils';
import { Search, Filter, CreditCard, Ticket as TicketIcon } from 'lucide-react';
import type { TicketType } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';

export default function UserTickets() {
  const navigate = useNavigate();
  const { ticketTypes, loading } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredTickets, setFilteredTickets] = useState<TicketType[]>([]);

  // 分类列表
  const categories = [
    { id: 'all', name: '全部' },
    { id: '日场票', name: '日场票' },
    { id: '夜场票', name: '夜场票' },
    { id: '套票', name: '套票' },
    { id: '年卡', name: '年卡' },
  ];

  // 过滤票种
  useEffect(() => {
    let result = ticketTypes.filter(t => t.status === 'active');
    
    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }
    
    if (searchKeyword) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        t.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    
    setFilteredTickets(result);
  }, [ticketTypes, activeCategory, searchKeyword]);

  if (loading) {
    return <Loading fullScreen text="加载中..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部搜索栏 */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索票种"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="bg-white px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 票种列表 */}
      <div className="p-4 space-y-3">
        {filteredTickets.length === 0 ? (
          <EmptyState 
            icon={<TicketIcon className="w-8 h-8" />}
            title="暂无票种"
            description="当前没有可购票种，请稍后再试"
            action={{
              label: '刷新',
              onClick: () => window.location.reload()
            }}
          />
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => navigate(`/user/ticket/${ticket.id}`)}
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <img
                  src={ticket.image}
                  alt={ticket.name}
                  className="w-28 h-28 object-cover"
                />
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ticket.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-lg font-bold text-red-600">{formatPrice(ticket.price)}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">
                        {formatPrice(ticket.originalPrice)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">库存: {ticket.stock}</span>
                  </div>
                </div>
              </div>
              {/* 特性标签 */}
              <div className="px-3 pb-3 flex gap-2 flex-wrap">
                {ticket.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/user')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button 
            onClick={() => navigate('/user/tickets')}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <Filter className="w-5 h-5" />
            <span className="text-xs">购票</span>
          </button>
          <button 
            onClick={() => navigate('/user/my-tickets')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">门票</span>
          </button>
        </div>
      </div>
    </div>
  );
}
