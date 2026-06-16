import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket, Calendar, MapPin, Bell, Ticket as TicketIcon, User, ShoppingBag } from 'lucide-react';

export default function H5Home() {
  const { tickets, announcements, investments } = useStore();

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getLevelName = (level: number) => {
    const names = { 1: '普通会员', 2: '银卡会员', 3: '金卡会员', 4: '铂金会员' };
    return names[level as keyof typeof names] || '普通会员';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl text-gray-800 p-4 sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">揽月城广场</h1>
            <p className="text-xs text-gray-400">欢迎来到揽月城商业综合体</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/h5/member" className="p-2.5 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-200">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-52 mx-4 mt-4 overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-600">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative h-full flex items-center px-6">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium">限时特惠</span>
            <h2 className="text-3xl font-bold text-white mt-3">全馆通票</h2>
            <p className="text-4xl font-bold text-white mt-2 drop-shadow-lg">{formatPrice(299)} <span className="text-lg line-through opacity-70">¥399</span></p>
            <Link
              to="/h5/ticket/1"
              className="inline-block mt-4 px-8 py-3 bg-white text-primary-600 font-semibold rounded-full shadow-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
            >
              立即购买
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 px-4 -mt-6 relative z-10">
        <Link
          to="/h5/tickets"
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-white/50 hover:scale-105"
          style={{ animationDelay: '0ms' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <TicketIcon className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs mt-3 font-medium text-gray-700">票务中心</p>
        </Link>
        <Link
          to="/h5/my-tickets"
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-white/50 hover:scale-105"
          style={{ animationDelay: '100ms' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs mt-3 font-medium text-gray-700">我的门票</p>
        </Link>
        <Link
          to="/h5/member"
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-white/50 hover:scale-105"
          style={{ animationDelay: '200ms' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs mt-3 font-medium text-gray-700">会员中心</p>
        </Link>
        <Link
          to="/h5/investment"
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-white/50 hover:scale-105"
          style={{ animationDelay: '300ms' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs mt-3 font-medium text-gray-700">招商信息</p>
        </Link>
      </div>

      {/* Announcements */}
      <div className="px-4 mt-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">最新公告</h3>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div key={ann.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  ann.type === 'activity' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' :
                  ann.type === 'warning' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                  'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {ann.type === 'activity' ? '活动' : ann.type === 'warning' ? '通知' : '公告'}
                </span>
                <p className="text-sm text-gray-700 flex-1">{ann.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Tickets */}
      <div className="px-4 mt-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">热门票种</h3>
          <Link to="/h5/tickets" className="text-sm text-primary-600 font-medium hover:text-accent-500 transition-colors">查看全部</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {tickets.slice(0, 4).map((ticket, index) => (
            <Link
              key={ticket.id}
              to={`/h5/ticket/${ticket.id}`}
              className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-24 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full" />
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full" />
                <TicketIcon className="w-10 h-10 text-white relative z-10" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{ticket.name}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{formatPrice(ticket.price)}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{ticket.validDays}天有效</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-around items-center safe-area-pb">
        <Link to="/h5/home" className="flex flex-col items-center text-primary-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs mt-1 font-medium">首页</span>
        </Link>
        <Link to="/h5/tickets" className="flex flex-col items-center text-gray-400">
          <TicketIcon className="w-6 h-6" />
          <span className="text-xs mt-1">票务</span>
        </Link>
        <Link to="/h5/my-tickets" className="flex flex-col items-center text-gray-400">
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-gray-400">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>
    </div>
  );
}
