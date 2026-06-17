import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Loading } from '../../components/ui/Loading';
import { formatPrice } from '../../lib/utils';
import { 
  Ticket, User, Bell, ChevronRight, 
  Flame, Gift, CreditCard 
} from 'lucide-react';

export default function UserHome() {
  const navigate = useNavigate();
  const { user, isLoggedIn, ticketTypes, announcements, loading } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 轮播图数据
  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', title: '夏季狂欢节' },
    { id: 2, image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800', title: '家庭套票优惠' },
    { id: 3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: '年卡特惠' },
  ];

  // 热销票种
  const hotTickets = ticketTypes.slice(0, 3);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <Loading fullScreen text="加载中..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">揽月城广场</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={() => navigate('/user/profile')}>
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 轮播图 */}
      <div className="relative h-48 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <p className="text-white font-bold">{banner.title}</p>
            </div>
          </div>
        ))}
        {/* 轮播指示器 */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="bg-white px-4 py-6 grid grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/user/tickets')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs text-gray-700">购票</span>
        </button>
        <button 
          onClick={() => navigate('/user/my-tickets')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-xs text-gray-700">我的门票</span>
        </button>
        <button 
          onClick={() => navigate('/user/member')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-xs text-gray-700">会员中心</span>
        </button>
        <button 
          onClick={() => navigate('/user/investment')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs text-gray-700">招商合作</span>
        </button>
      </div>

      {/* 公告通知 */}
      {announcements.length > 0 && (
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-gray-700 truncate">{announcements[0].title}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* 热销票种 */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">热销票种</h2>
          <button 
            onClick={() => navigate('/user/tickets')}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {hotTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => navigate(`/user/ticket/${ticket.id}`)}
              className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <img 
                src={ticket.image} 
                alt={ticket.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{ticket.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-lg font-bold text-red-600">{formatPrice(ticket.price)}</span>
                    <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(ticket.originalPrice)}</span>
                  </div>
                  <span className="text-xs text-gray-500">已售{ticket.sales}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 会员信息卡片 */}
      {isLoggedIn && user ? (
        <div className="bg-white mt-2 px-4 py-4">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">会员等级</p>
                <p className="text-lg font-bold mt-1">
                  {user.memberLevel === 1 ? '普通会员' : 
                   user.memberLevel === 2 ? '银卡会员' :
                   user.memberLevel === 3 ? '金卡会员' :
                   user.memberLevel === 4 ? '铂金会员' : '钻石会员'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">积分</p>
                <p className="text-lg font-bold mt-1">{user.memberPoints}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">余额: {formatPrice(user.balance)}</span>
              <button 
                onClick={() => navigate('/user/member')}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                充值
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white mt-2 px-4 py-4">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-gray-600 mb-3">登录后享受会员专属优惠</p>
            <Button onClick={() => navigate('/user/login')}>立即登录</Button>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/user')}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <Ticket className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button 
            onClick={() => navigate('/user/tickets')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">购票</span>
          </button>
          <button 
            onClick={() => navigate('/user/my-tickets')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
