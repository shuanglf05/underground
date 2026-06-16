import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Ticket as TicketIcon, Wallet, Crown, ChevronRight, LogOut, X, Plus } from 'lucide-react';
import { useState } from 'react';

export default function H5Member() {
  const { currentMember, members, updateMemberBalance } = useStore();
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [message, setMessage] = useState('');

  const member = currentMember || members[0];

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getLevelName = (level: number) => {
    const names: Record<number, string> = { 1: '普通会员', 2: '银卡会员', 3: '金卡会员', 4: '铂金会员' };
    return names[level] || '普通会员';
  };

  const getLevelColor = (level: number) => {
    const colors: Record<number, string> = {
      1: 'from-gray-400 to-gray-500',
      2: 'from-gray-300 to-gray-400',
      3: 'from-accent-300 to-accent-400',
      4: 'from-purple-400 to-purple-600',
    };
    return colors[level] || colors[1];
  };

  const getLevelBgColor = (level: number) => {
    const colors: Record<number, string> = {
      1: 'bg-gray-100',
      2: 'bg-gray-50',
      3: 'bg-accent-50',
      4: 'bg-purple-50',
    };
    return colors[level] || colors[1];
  };

  const handleRecharge = async () => {
    if (!member || rechargeAmount <= 0) return;
    const res = await fetch(`/api/members/${member.id}/recharge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: rechargeAmount }),
    });
    const data = await res.json();
    if (data.success) {
      setShowRechargeModal(false);
      setRechargeAmount(0);
      setMessage('充值成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('充值失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      setMessage('已退出登录');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">请先注册成为会员</p>
          <button
            onClick={() => {
              setMessage('注册功能开发中');
              setTimeout(() => setMessage(''), 3000);
            }}
            className="px-6 py-2 bg-primary-500 text-white rounded-full"
          >
            立即注册
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-r ${getLevelColor(member.level)} text-white p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">会员中心</h1>
          <button onClick={handleLogout} className="p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="text-white/80 text-sm">{member.phone}</p>
          </div>
        </div>
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 ${getLevelBgColor(member.level)} rounded-full`}>
          <Crown className="w-4 h-4 text-accent-500" />
          <span className="text-sm font-medium text-gray-700">{getLevelName(member.level)}</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex">
            <div className="flex-1 text-center p-4 border-r border-gray-100">
              <p className="text-sm text-gray-500 mb-1">余额</p>
              <p className="text-2xl font-bold text-primary-600">{formatPrice(member.balance)}</p>
            </div>
            <div className="flex-1 text-center p-4 border-r border-gray-100">
              <p className="text-sm text-gray-500 mb-1">积分</p>
              <p className="text-2xl font-bold text-accent-500">{member.points}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p className="text-sm text-gray-500 mb-1">等级</p>
              <p className="text-2xl font-bold text-purple-600">V{member.level}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowRechargeModal(true)}
              className="flex-1 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              充值
            </button>
            <button
              onClick={() => {
                setMessage('积分商城开发中');
                setTimeout(() => setMessage(''), 3000);
              }}
              className="flex-1 py-2 bg-accent-100 text-accent-600 rounded-xl font-medium hover:bg-accent-200 transition-colors"
            >
              积分商城
            </button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-4">
        <Link
          to="/h5/my-tickets"
          className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <TicketIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">我的门票</h3>
            <p className="text-sm text-gray-400">查看已购门票</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          to="/h5/orders"
          className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">消费记录</h3>
            <p className="text-sm text-gray-400">查看全部订单</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-medium text-gray-800 mb-4">会员权益</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">购票折扣</span>
              <span className="text-sm font-medium text-accent-500">
                {member.level >= 3 ? '8折' : member.level >= 2 ? '9折' : '无'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">积分倍率</span>
              <span className="text-sm font-medium text-accent-500">
                {member.level >= 3 ? '2倍' : member.level >= 2 ? '1.5倍' : '1倍'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">专属活动</span>
              <span className="text-sm font-medium text-accent-500">
                {member.level >= 4 ? '优先参与' : '普通参与'}
              </span>
            </div>
          </div>
        </div>
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
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span className="text-xs mt-1">门票</span>
        </Link>
        <Link to="/h5/member" className="flex flex-col items-center text-primary-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs mt-1 font-medium">我的</span>
        </Link>
      </nav>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">会员充值</h2>
              <button onClick={() => setShowRechargeModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-primary-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-500">当前余额</p>
              <p className="text-2xl font-bold text-primary-600">{formatPrice(member.balance)}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">充值金额</label>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入充值金额"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setRechargeAmount(amount)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                      rechargeAmount === amount
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    ¥{amount}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRechargeModal(false)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium"
              >
                取消
              </button>
              <button
                onClick={handleRecharge}
                className="flex-1 py-2 bg-primary-500 text-white rounded-xl font-medium"
              >
                确认充值
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
