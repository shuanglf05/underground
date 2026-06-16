import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import { Users, Search, Phone, Mail, Crown } from 'lucide-react';

export default function AdminMembers() {
  const { members } = useStore();

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getLevelName = (level: number) => {
    const names: Record<number, string> = { 1: '普通', 2: '银卡', 3: '金卡', 4: '铂金' };
    return names[level] || '普通';
  };

  const getLevelBadge = (level: number) => {
    const badges: Record<number, { bg: string; text: string }> = {
      1: { bg: 'bg-gray-100', text: 'text-gray-600' },
      2: { bg: 'bg-slate-100', text: 'text-slate-600' },
      3: { bg: 'bg-amber-100', text: 'text-amber-600' },
      4: { bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    return badges[level] || badges[1];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">会员管理</h1>
            <p className="text-sm text-gray-500">管理会员信息及等级</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索会员..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">会员总数</p>
            <p className="text-2xl font-bold text-gray-800">{members.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">金卡以上</p>
            <p className="text-2xl font-bold text-amber-600">{members.filter((m) => m.level >= 3).length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">本月新增</p>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">总余额</p>
            <p className="text-2xl font-bold text-primary-600">{formatPrice(members.reduce((sum, m) => sum + m.balance, 0))}</p>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">会员信息</th>
                <th className="px-6 py-4 font-medium">等级</th>
                <th className="px-6 py-4 font-medium">余额</th>
                <th className="px-6 py-4 font-medium">积分</th>
                <th className="px-6 py-4 font-medium">联系方式</th>
                <th className="px-6 py-4 font-medium">注册时间</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const badge = getLevelBadge(member.level);
                return (
                  <tr key={member.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">{member.name[0]}</span>
                        </div>
                        <span className="font-medium text-gray-800">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <Crown className="w-3 h-3" />
                        {getLevelName(member.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-accent-600">{formatPrice(member.balance)}</td>
                    <td className="px-6 py-4 text-gray-600">{member.points}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {member.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
