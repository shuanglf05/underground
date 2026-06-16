import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import { Wallet, CreditCard, Coins, History, Search, Plus, X, User } from 'lucide-react';
import { useState } from 'react';
import type { Bracelet } from '../../types';

export default function AdminCashier() {
  const { bracelets, fetchBracelets } = useStore();
  const [activeTab, setActiveTab] = useState('bracelets');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [selectedBracelet, setSelectedBracelet] = useState<Bracelet | null>(null);
  const [issueForm, setIssueForm] = useState({ memberId: '', deposit: 50 });
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [message, setMessage] = useState('');

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      available: { bg: 'bg-green-100', text: 'text-green-600', label: '可用' },
      in_use: { bg: 'bg-blue-100', text: 'text-blue-600', label: '使用中' },
      lost: { bg: 'bg-red-100', text: 'text-red-600', label: '已挂失' },
      damaged: { bg: 'bg-orange-100', text: 'text-orange-600', label: '已损坏' },
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  };

  const filteredBracelets = bracelets.filter((b) =>
    b.serialNo.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    b.memberName?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const stats = {
    total: bracelets.length,
    inUse: bracelets.filter((b) => b.status === 'in_use').length,
    available: bracelets.filter((b) => b.status === 'available').length,
    totalDeposit: bracelets.reduce((sum, b) => sum + b.deposit, 0),
  };

  const handleIssueBracelet = async () => {
    const res = await fetch('/api/bracelets/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId: Number(issueForm.memberId), deposit: issueForm.deposit }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchBracelets();
      setShowIssueModal(false);
      setIssueForm({ memberId: '', deposit: 50 });
      setMessage('手环发放成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('发放失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReturnBracelet = async (bracelet: Bracelet) => {
    const res = await fetch(`/api/bracelets/${bracelet.id}/return`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      await fetchBracelets();
      setMessage('手环退还成功，押金已返还');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('退还失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRecharge = async () => {
    if (!selectedBracelet) return;
    const res = await fetch(`/api/bracelets/${selectedBracelet.id}/recharge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: rechargeAmount }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchBracelets();
      setShowRechargeModal(false);
      setSelectedBracelet(null);
      setRechargeAmount(0);
      setMessage('充值成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('充值失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReportLost = async (bracelet: Bracelet) => {
    const res = await fetch(`/api/bracelets/${bracelet.id}/lost`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      await fetchBracelets();
      setMessage('手环已挂失');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const openRechargeModal = (bracelet: Bracelet) => {
    setSelectedBracelet(bracelet);
    setRechargeAmount(0);
    setShowRechargeModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">收银管理</h1>
            <p className="text-sm text-gray-500">手环管理与押金统计</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-500">手环总数</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">使用中</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.inUse}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">可用</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <History className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-gray-500">押金总额</span>
            </div>
            <p className="text-2xl font-bold text-accent-600">{formatPrice(stats.totalDeposit)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('bracelets')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'bracelets' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              手环管理
            </button>
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'deposit' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              押金管理
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'bracelets' && (
              <>
                {/* Search & Add */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索手环编号或会员姓名..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowIssueModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    发放手环
                  </button>
                </div>

                {/* Bracelets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-sm text-gray-500">
                        <th className="px-4 py-3 font-medium">手环编号</th>
                        <th className="px-4 py-3 font-medium">状态</th>
                        <th className="px-4 py-3 font-medium">绑定会员</th>
                        <th className="px-4 py-3 font-medium">余额</th>
                        <th className="px-4 py-3 font-medium">押金</th>
                        <th className="px-4 py-3 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBracelets.map((bracelet) => {
                        const badge = getStatusBadge(bracelet.status);
                        return (
                          <tr key={bracelet.id} className="border-t border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-sm">{bracelet.serialNo}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                                {badge.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">{bracelet.memberName || '-'}</td>
                            <td className="px-4 py-3 font-medium text-accent-600">{formatPrice(bracelet.balance)}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{formatPrice(bracelet.deposit)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {bracelet.status === 'available' && (
                                  <button
                                    onClick={() => setShowIssueModal(true)}
                                    className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                                  >
                                    发放
                                  </button>
                                )}
                                {bracelet.status === 'in_use' && (
                                  <>
                                    <button
                                      onClick={() => openRechargeModal(bracelet)}
                                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
                                    >
                                      充值
                                    </button>
                                    <button
                                      onClick={() => handleReturnBracelet(bracelet)}
                                      className="px-3 py-1 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600"
                                    >
                                      退还
                                    </button>
                                  </>
                                )}
                                {bracelet.status === 'lost' && (
                                  <button
                                    onClick={() => handleReportLost(bracelet)}
                                    className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600"
                                  >
                                    注销
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'deposit' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 mb-1">押金收入</p>
                    <p className="text-xl font-bold text-blue-800">{formatPrice(stats.totalDeposit)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 mb-1">未退还押金</p>
                    <p className="text-xl font-bold text-green-800">{formatPrice(stats.inUse * 50)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">今日退还</p>
                    <p className="text-xl font-bold text-gray-800">¥0.00</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-gray-700 mb-3">押金记录</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-sm font-medium">手环 BR20240002 押金退还</p>
                        <p className="text-xs text-gray-400">2024-06-15 10:30</p>
                      </div>
                      <span className="text-green-600 font-medium">-¥50.00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-sm font-medium">手环 BR20240005 押金收取</p>
                        <p className="text-xs text-gray-400">2024-06-15 09:15</p>
                      </div>
                      <span className="text-blue-600 font-medium">+¥50.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Issue Bracelet Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">发放手环</h2>
              <button onClick={() => setShowIssueModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">会员ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={issueForm.memberId}
                    onChange={(e) => setIssueForm({ ...issueForm, memberId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="请输入会员ID"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">押金金额</label>
                <input
                  type="number"
                  value={issueForm.deposit}
                  onChange={(e) => setIssueForm({ ...issueForm, deposit: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入押金金额"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowIssueModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleIssueBracelet}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                确认发放
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recharge Modal */}
      {showRechargeModal && selectedBracelet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">充值</h2>
              <button onClick={() => { setShowRechargeModal(false); setSelectedBracelet(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">手环编号</p>
                <p className="font-medium text-gray-800 font-mono">{selectedBracelet.serialNo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">当前余额</label>
                <p className="text-xl font-bold text-accent-600">{formatPrice(selectedBracelet.balance)}</p>
              </div>
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
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowRechargeModal(false); setSelectedBracelet(null); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleRecharge}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
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
