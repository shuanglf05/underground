import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { formatPrice, getMemberLevelName } from '../../lib/utils';
import { Plus, Edit, Search, CreditCard, User } from 'lucide-react';

export default function AdminMembers() {
  const [showRecharge, setShowRecharge] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');

  const [members] = useState([
    { id: '1', phone: '13800138000', nickname: '张三', level: 3, points: 2580, balance: 500, createdAt: '2024-01-15' },
    { id: '2', phone: '13900139000', nickname: '李四', level: 2, points: 1200, balance: 200, createdAt: '2024-02-20' },
    { id: '3', phone: '13700137000', nickname: '王五', level: 4, points: 5200, balance: 1200, createdAt: '2024-03-10' },
    { id: '4', phone: '13600136000', nickname: '赵六', level: 1, points: 500, balance: 0, createdAt: '2024-04-05' },
  ]);

  const handleRecharge = (member: any) => {
    setSelectedMember(member);
    setRechargeAmount('');
    setShowRecharge(true);
  };

  const handleRechargeSubmit = () => {
    if (!rechargeAmount || Number(rechargeAmount) <= 0) {
      toast.error('请输入正确的充值金额');
      return;
    }
    toast.success(`充值成功：${rechargeAmount}元`);
    setShowRecharge(false);
  };

  const filteredMembers = members.filter(m =>
    m.nickname.includes(searchKeyword) ||
    m.phone.includes(searchKeyword)
  );

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">会员管理</h2>
        <Button icon={<Plus className="w-4 h-4" />}>新增会员</Button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索会员昵称或手机号"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">全部等级</option>
            <option value="1">普通会员</option>
            <option value="2">银卡会员</option>
            <option value="3">金卡会员</option>
            <option value="4">铂金会员</option>
            <option value="5">钻石会员</option>
          </select>
        </div>
      </div>

      {/* 会员列表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">会员信息</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">手机号</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">等级</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">积分</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">余额</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">注册时间</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      {member.nickname[0]}
                    </div>
                    <span className="text-sm font-medium">{member.nickname}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{member.phone}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    member.level === 1 ? 'bg-gray-100 text-gray-800' :
                    member.level === 2 ? 'bg-gray-200 text-gray-800' :
                    member.level === 3 ? 'bg-yellow-100 text-yellow-800' :
                    member.level === 4 ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {getMemberLevelName(member.level)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{member.points}</td>
                <td className="py-3 px-4 text-sm font-medium text-green-600">{formatPrice(member.balance)}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{member.createdAt}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRecharge(member)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="充值"
                    >
                      <CreditCard className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="编辑">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 充值弹窗 */}
      <Modal
        isOpen={showRecharge}
        onClose={() => setShowRecharge(false)}
        title="会员充值"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {selectedMember?.nickname?.[0]}
              </div>
              <div>
                <p className="font-medium">{selectedMember?.nickname}</p>
                <p className="text-sm text-gray-500">{selectedMember?.phone}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-500">当前余额</span>
              <span className="font-bold text-green-600">{formatPrice(selectedMember?.balance || 0)}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">充值金额</label>
            <input
              type="number"
              placeholder="请输入充值金额"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-sm text-yellow-800">充值优惠：满500送50，满1000送150</p>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowRecharge(false)} variant="outline">取消</Button>
            <Button onClick={handleRechargeSubmit}>确认充值</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}