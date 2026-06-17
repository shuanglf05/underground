import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Crown, Plus, Edit, Trash2 } from 'lucide-react';

const levelColors = [
  'bg-gray-100 text-gray-800',
  'bg-gray-200 text-gray-800',
  'bg-yellow-100 text-yellow-800',
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
];

const levelNames = ['普通会员', '银卡会员', '金卡会员', '铂金会员', '钻石会员'];

export default function AdminMemberLevels() {
  const [levels, setLevels] = useState([
    { id: '1', name: '普通会员', level: 1, threshold: 0, discount: 1.0, validDays: 365, benefits: '基础服务' },
    { id: '2', name: '银卡会员', level: 2, threshold: 500, discount: 0.95, validDays: 365, benefits: '95折优惠' },
    { id: '3', name: '金卡会员', level: 3, threshold: 2000, discount: 0.9, validDays: 365, benefits: '9折优惠+生日礼品' },
    { id: '4', name: '铂金会员', level: 4, threshold: 5000, discount: 0.85, validDays: 365, benefits: '85折优惠+专属客服' },
    { id: '5', name: '钻石会员', level: 5, threshold: 10000, discount: 0.8, validDays: 365, benefits: '8折优惠+VIP服务' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<any>(null);

  const handleAdd = () => {
    setEditingLevel(null);
    setShowModal(true);
  };

  const handleEdit = (level: any) => {
    setEditingLevel(level);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该会员等级吗？')) {
      setLevels(levels.filter(l => l.id !== id));
      toast.success('删除成功');
    }
  };

  const handleSave = () => {
    if (editingLevel) {
      setLevels(levels.map(l => l.id === editingLevel.id ? { ...l, ...editingLevel } : l));
      toast.success('更新成功');
    } else {
      const newLevel = {
        ...editingLevel,
        id: String(Date.now()),
        level: levels.length + 1,
        name: levelNames[levels.length] || `等级${levels.length + 1}`
      };
      setLevels([...levels, newLevel]);
      toast.success('创建成功');
    }
    setShowModal(false);
    setEditingLevel(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">会员等级体系</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新增等级
        </Button>
      </div>

      {/* 等级卡片展示 */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {levels.map((level, index) => (
          <div key={level.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Crown className={`w-6 h-6 ${index === 4 ? 'text-purple-600' : index === 3 ? 'text-blue-600' : index === 2 ? 'text-yellow-600' : 'text-gray-500'}`} />
              <span className="font-medium">{level.name}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">充值门槛</span>
                <span className="font-medium">¥{level.threshold}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">折扣</span>
                <span className="font-medium">{(level.discount * 10).toFixed(0)}折</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">有效期</span>
                <span className="font-medium">{level.validDays}天</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 等级列表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">等级</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">名称</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">充值门槛</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">折扣</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">有效期</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">权益</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {levels.map((level) => (
              <tr key={level.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${levelColors[level.level - 1]}`}>
                    L{level.level}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{level.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm">¥{level.threshold}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm">{(level.discount * 10).toFixed(0)}折</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm">{level.validDays}天</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{level.benefits}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(level)} className="p-1 hover:bg-gray-100 rounded" title="编辑">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    {level.level > 1 && (
                      <button onClick={() => handleDelete(level.id)} className="p-1 hover:bg-gray-100 rounded" title="删除">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 升级规则设置 */}
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">升级规则设置</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">自动升级</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="auto">自动升级</option>
              <option value="manual">手动升级</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">降级规则</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="expire">到期自动降级</option>
              <option value="retain">保留等级</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">升级通知</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="sms">短信通知</option>
              <option value="wechat">微信通知</option>
              <option value="all">全部通知</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button>保存设置</Button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLevel ? '编辑会员等级' : '新增会员等级'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">等级名称</label>
            <input
              type="text"
              value={editingLevel?.name || ''}
              onChange={(e) => setEditingLevel({ ...editingLevel, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入等级名称"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">充值门槛</label>
              <input
                type="number"
                value={editingLevel?.threshold || ''}
                onChange={(e) => setEditingLevel({ ...editingLevel, threshold: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">折扣率</label>
              <input
                type="number"
                step="0.05"
                min="0.5"
                max="1"
                value={editingLevel?.discount || '1.0'}
                onChange={(e) => setEditingLevel({ ...editingLevel, discount: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">有效期（天）</label>
            <input
              type="number"
              value={editingLevel?.validDays || '365'}
              onChange={(e) => setEditingLevel({ ...editingLevel, validDays: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="365"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">权益说明</label>
            <input
              type="text"
              value={editingLevel?.benefits || ''}
              onChange={(e) => setEditingLevel({ ...editingLevel, benefits: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入权益说明"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}