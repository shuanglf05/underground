import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket as TicketIcon, Clock, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function H5TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, currentMember, createOrder } = useStore();
  const [loading, setLoading] = useState(false);

  const ticket = tickets.find((t) => t.id === Number(id));

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">票种不存在</p>
      </div>
    );
  }

  const handleBuy = async () => {
    if (!currentMember) {
      alert('请先登录会员');
      navigate('/h5/member');
      return;
    }

    setLoading(true);
    const order = await createOrder(currentMember.id, [{ ticketId: ticket.id, quantity: 1 }]);
    setLoading(false);

    if (order) {
      alert('购买成功！');
      navigate('/h5/my-tickets');
    } else {
      alert('购买失败，请重试');
    }
  };

  const getRightsDetails = () => {
    const rights = ticket.rights;
    const items: { icon: string; label: string; value: string }[] = [];

    if (rights.billiards) items.push({ icon: '🎱', label: '台球', value: `${rights.billiards}次` });
    if (rights.vr) items.push({ icon: '🥽', label: 'VR体验', value: `${rights.vr}次` });
    if (rights.trampoline) items.push({ icon: '🦘', label: '蹦床', value: `${rights.trampoline}次` });
    if (rights.swimming) items.push({ icon: '🏊', label: '游泳', value: '不限次' });
    if (rights.footBath) items.push({ icon: '🦶', label: '足浴', value: '不限次' });
    if (rights.restaurant) items.push({ icon: '🍽️', label: '餐饮', value: '享受折扣' });
    if (rights.movie) items.push({ icon: '🎬', label: '电影', value: '免费观影' });

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-primary-500 text-white p-4 sticky top-0 z-50 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">票种详情</h1>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <TicketIcon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{ticket.name}</h2>
            <p className="text-primary-200 text-sm mt-1">有效期：{ticket.validDays}天</p>
          </div>
        </div>
        <div className="mt-6">
          <span className="text-4xl font-bold text-accent-300">{formatPrice(ticket.price)}</span>
        </div>
      </div>

      {/* Rights */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-4">权益详情</h3>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {getRightsDetails().map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-4">购买须知</h3>
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-gray-600">购票后可在有效期内随时使用</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-gray-600">入园时出示电子票二维码核销</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <p className="text-sm text-gray-600">支持微信支付、会员余额支付</p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
            <p className="text-sm text-gray-600">未使用的票可在有效期前申请退款</p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500">合计</p>
          <p className="text-2xl font-bold text-accent-500">{formatPrice(ticket.price)}</p>
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-accent-400 to-accent-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center gap-2"
        >
          {loading ? (
            '购买中...'
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              立即购买
            </>
          )}
        </button>
      </div>
    </div>
  );
}
