import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket as TicketIcon, Calendar, ChevronRight } from 'lucide-react';

export default function H5Orders() {
  const { orders } = useStore();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getStatusInfo = (status: string, payStatus: string) => {
    if (payStatus === 'refunded') return { text: '已退款', color: 'text-gray-500 bg-gray-100' };
    if (status === 'used') return { text: '已完成', color: 'text-green-600 bg-green-100' };
    if (status === 'cancelled') return { text: '已取消', color: 'text-red-600 bg-red-100' };
    if (payStatus === 'pending') return { text: '待支付', color: 'text-orange-600 bg-orange-100' };
    return { text: '进行中', color: 'text-blue-600 bg-blue-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary-500 text-white p-4 sticky top-0 z-50">
        <h1 className="text-lg font-bold">消费记录</h1>
        <p className="text-xs text-primary-200">查看全部订单</p>
      </header>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无订单</p>
            <Link
              to="/h5/tickets"
              className="inline-block mt-4 px-6 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
            >
              去购票
            </Link>
          </div>
        ) : (
          orders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status, order.payStatus);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">{formatDate(order.createdAt)}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <TicketIcon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{item.ticketName}</p>
                        <p className="text-xs text-gray-400">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-600">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">订单号: {order.orderNo}</span>
                  <span className="font-bold text-primary-600">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            );
          })
        )}
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
          <TicketIcon className="w-6 h-6" />
          <span className="text-xs mt-1">票务</span>
        </Link>
        <Link to="/h5/my-tickets" className="flex flex-col items-center text-gray-400">
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-primary-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs mt-1 font-medium">我的</span>
        </Link>
      </nav>
    </div>
  );
}
