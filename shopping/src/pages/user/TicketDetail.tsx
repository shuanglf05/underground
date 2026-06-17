import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { formatPrice } from '../../lib/utils';
import { 
  ArrowLeft, Ticket, Calendar, Clock, Users, 
  MapPin, Star, ChevronDown, CreditCard, Minus, Plus 
} from 'lucide-react';

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ticketTypes, isLoggedIn, user, createOrder } = useStore();
  const [ticket, setTicket] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const found = ticketTypes.find(t => t.id === id);
    if (found) {
      setTicket(found);
    }
  }, [id, ticketTypes]);

  const handleBuy = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowBuyModal(true);
  };

  const handleConfirmBuy = async () => {
    if (!ticket) return;
    
    const order = await createOrder(ticket.id, quantity);
    if (order) {
      toast.success(`购票成功！订单号: ${order.id}`);
      setShowBuyModal(false);
      navigate('/user/my-tickets');
    } else {
      toast.error('购票失败，请重试');
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">票种不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部栏 */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/user/tickets')} className="text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">票种详情</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 票种图片 */}
      <div className="relative h-64">
        <img 
          src={ticket.image} 
          alt={ticket.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className={`inline-block px-3 py-1 text-xs rounded-full ${
            ticket.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {ticket.status === 'active' ? '在售' : '停售'}
          </span>
        </div>
      </div>

      {/* 基本信息 */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{ticket.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {ticket.features.slice(0, 3).map((feature: string, index: number) => (
                <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-red-600">{formatPrice(ticket.price)}</span>
            {ticket.originalPrice > ticket.price && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(ticket.originalPrice)}</p>
            )}
          </div>
        </div>
        <p className="text-gray-600">{ticket.description}</p>
      </div>

      {/* 详情信息 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">票种详情</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>有效期</span>
            </div>
            <span className="text-gray-900">{ticket.validDays}天</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>使用时间</span>
            </div>
            <span className="text-gray-900">{ticket.useTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span>适用人数</span>
            </div>
            <span className="text-gray-900">{ticket.personCount}人</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>使用地点</span>
            </div>
            <span className="text-gray-900">{ticket.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Star className="w-4 h-4" />
              <span>好评率</span>
            </div>
            <span className="text-gray-900">{ticket.rating}%</span>
          </div>
        </div>
      </div>

      {/* 使用须知 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">使用须知</h3>
        <div className="space-y-2">
          {ticket.notices.map((notice: string, index: number) => (
            <p key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              {notice}
            </p>
          ))}
        </div>
      </div>

      {/* 购买按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center text-xl font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <Button onClick={handleBuy} className="flex-1">
            立即购买 {formatPrice(ticket.price * quantity)}
          </Button>
        </div>
      </div>

      {/* 购买确认弹窗 */}
      <Modal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        title="确认购票"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex gap-3">
              <img 
                src={ticket.image} 
                alt={ticket.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold">{ticket.name}</h4>
                <p className="text-sm text-gray-500 mt-1">x{quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">{formatPrice(ticket.price * quantity)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">购买人</span>
              <span className="font-medium">{user?.nickname || '未知用户'}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">手机号</span>
              <span className="font-medium">{user?.phone || '未绑定'}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setShowBuyModal(false)} variant="outline">取消</Button>
            <Button onClick={handleConfirmBuy}>确认购买</Button>
          </div>
        </div>
      </Modal>

      {/* 登录提示弹窗 */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="请先登录"
      >
        <div className="space-y-4">
          <p className="text-gray-600">登录后才能进行购票操作</p>
          <div className="flex gap-2">
            <Button onClick={() => setShowLoginModal(false)} variant="outline">取消</Button>
            <Button onClick={() => { setShowLoginModal(false); navigate('/user/login'); }}>去登录</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}