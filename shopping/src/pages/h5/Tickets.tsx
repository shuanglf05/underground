import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket as TicketIcon, Clock, CheckCircle } from 'lucide-react';

export default function H5Tickets() {
  const { tickets } = useStore();

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getTicketTypeName = (type: string) => {
    const names: Record<string, string> = {
      unified: '通票',
      single: '单票',
      package: '套餐',
    };
    return names[type] || type;
  };

  const getTicketTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      unified: 'bg-gradient-to-r from-purple-500 to-pink-500',
      single: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      package: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  const getRightsLabel = (rights: any) => {
    const labels: string[] = [];
    if (rights.billiards) labels.push(`台球${rights.billiards}次`);
    if (rights.vr) labels.push(`VR${rights.vr}次`);
    if (rights.trampoline) labels.push(`蹦床${rights.trampoline}次`);
    if (rights.swimming) labels.push('游泳');
    if (rights.footBath) labels.push('足浴');
    if (rights.restaurant) labels.push('餐饮');
    if (rights.movie) labels.push('电影');
    return labels.slice(0, 4).join('、');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary-500 text-white p-4 sticky top-0 z-50">
        <h1 className="text-lg font-bold">票务中心</h1>
        <p className="text-xs text-primary-200">选择最适合您的票种</p>
      </header>

      {/* Tickets Grid */}
      <div className="p-4 space-y-4">
        {tickets.map((ticket, index) => (
          <Link
            key={ticket.id}
            to={`/h5/ticket/${ticket.id}`}
            className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={`h-20 ${getTicketTypeColor(ticket.type)} flex items-center justify-between px-4`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TicketIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-bold">{ticket.name}</h3>
                  <p className="text-xs text-white/80">{getTicketTypeName(ticket.type)} · {ticket.validDays}天有效</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{formatPrice(ticket.price)}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">包含权益</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {getRightsLabel(ticket.rights).split('、').map((label, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Link>
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
        <Link to="/h5/tickets" className="flex flex-col items-center text-primary-500">
          <TicketIcon className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">票务</span>
        </Link>
        <Link to="/h5/my-tickets" className="flex flex-col items-center text-gray-400">
          <Clock className="w-6 h-6" />
          <span className="text-xs mt-1">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>
    </div>
  );
}
