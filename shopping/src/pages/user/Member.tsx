import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { formatPrice } from '../../lib/utils';
import { 
  User, CreditCard, Gift, History, Settings, 
  ChevronRight, Star, Wallet, Award, ArrowLeft 
} from 'lucide-react';

export default function UserMember() {
  const navigate = useNavigate();
  const { user, isLoggedIn, coupons, userCoupons } = useStore();
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [activeTab, setActiveTab] = useState('member');

  const handleRecharge = async () => {
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      toast.error('请输入有效的充值金额');
      return;
    }
    setShowRechargeModal(false);
    setRechargeAmount('');
    toast.success('充值成功');
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">请先登录</p>
          <Button onClick={() => navigate('/user/login')}>立即登录</Button>
        </div>
      </div>
    );
  }

  const levelInfo = {
    1: { name: '普通会员', discount: 1, color: 'text-gray-500', bg: 'bg-gray-100' },
    2: { name: '银卡会员', discount: 0.95, color: 'text-blue-500', bg: 'bg-blue-100' },
    3: { name: '金卡会员', discount: 0.9, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    4: { name: '铂金会员', discount: 0.85, color: 'text-purple-500', bg: 'bg-purple-100' },
    5: { name: '钻石会员', discount: 0.8, color: 'text-pink-500', bg: 'bg-pink-100' },
  };

  const currentLevel = levelInfo[user.memberLevel] || levelInfo[1];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/user')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">会员中心</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 会员信息卡片 */}
      <div className="bg-white mx-4 -mt-6 rounded-xl shadow-lg p-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${currentLevel.bg} rounded-full flex items-center justify-center`}>
            <User className={`w-8 h-8 ${currentLevel.color}`} />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{user.nickname}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 ${currentLevel.bg} ${currentLevel.color} text-xs rounded-full`}>
                {currentLevel.name}
              </span>
              <span className="text-sm text-gray-500">折扣 {currentLevel.discount * 10}折</span>
            </div>
          </div>
          <button onClick={() => navigate('/user/profile')} className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(user.balance)}</p>
            <p className="text-xs text-gray-500 mt-1">账户余额</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{user.memberPoints}</p>
            <p className="text-xs text-gray-500 mt-1">积分</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{userCoupons.length}</p>
            <p className="text-xs text-gray-500 mt-1">优惠券</p>
          </div>
        </div>

        <Button 
          onClick={() => setShowRechargeModal(true)}
          className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
        >
          <Wallet className="w-4 h-4 mr-2" />
          立即充值
        </Button>
      </div>

      {/* 标签页 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('member')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'member' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>会员权益</span>
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'coupons' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>优惠券</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
            }`}
          >
            <History className="w-4 h-4" />
            <span>消费记录</span>
          </button>
        </div>
      </div>

      {/* 会员权益 */}
      {activeTab === 'member' && (
        <div className="bg-white mx-4 mt-4 rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-4">会员专属权益</h3>
          <div className="space-y-3">
            {[
              { icon: Star, title: '积分翻倍', desc: '消费享双倍积分' },
              { icon: CreditCard, title: '专属折扣', desc: `${currentLevel.discount * 10}折优惠` },
              { icon: Gift, title: '生日礼包', desc: '生日当月领取专属礼包' },
              { icon: Wallet, title: '优先服务', desc: '排队优先，专属通道' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 优惠券 */}
      {activeTab === 'coupons' && (
        <div className="bg-white mx-4 mt-4 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">我的优惠券</h3>
            <button onClick={() => navigate('/user/coupons')} className="text-sm text-blue-600">查看全部</button>
          </div>
          {coupons.length > 0 ? (
            <div className="space-y-3">
              {coupons.slice(0, 3).map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                >
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-600">¥{coupon.value}</p>
                    <p className="text-xs text-gray-500">满{coupon.minAmount}可用</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{coupon.name}</p>
                    <p className="text-xs text-gray-500">{coupon.validFrom} - {coupon.validTo}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    立即使用
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Gift className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">暂无优惠券</p>
            </div>
          )}
        </div>
      )}

      {/* 消费记录 */}
      {activeTab === 'history' && (
        <div className="bg-white mx-4 mt-4 rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-4">消费记录</h3>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', type: '门票消费', amount: '-¥128', desc: '单人日场票' },
              { date: '2024-01-14', type: '充值', amount: '+¥500', desc: '会员充值' },
              { date: '2024-01-10', type: '商品消费', amount: '-¥35', desc: '饮料购买' },
              { date: '2024-01-08', type: '门票消费', amount: '-¥256', desc: '双人套票' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.type}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.amount}
                  </p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/user')} className="flex flex-col items-center gap-1 text-gray-500">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/user/tickets')} className="flex flex-col items-center gap-1 text-gray-500">
            <Gift className="w-5 h-5" />
            <span className="text-xs">购票</span>
          </button>
          <button onClick={() => navigate('/user/member')} className="flex flex-col items-center gap-1 text-blue-600">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

      {/* 充值弹窗 */}
      <Modal
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        title="充值"
        size="md"
      >
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">充值金额</label>
              <input
                type="number"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                placeholder="请输入充值金额"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 200, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setRechargeAmount(amount.toString())}
                  className={`py-2 rounded-lg border transition-colors ${
                    rechargeAmount === amount.toString()
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  ¥{amount}
                </button>
              ))}
            </div>
            <Button onClick={handleRecharge} className="w-full">确认充值</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}