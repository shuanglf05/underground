import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Percent, Plus, Edit, Trash2, Calendar, Tag, Search } from 'lucide-react';

const businessTypes = ['全部业态', '餐饮', '娱乐', '购物', '服务', '运动'];

export default function AdminMemberDiscount() {
  const [discounts, setDiscounts] = useState([
    { id: '1', level: 1, levelName: '普通会员', business: '全部业态', discount: 1.0, note: '' },
    { id: '2', level: 2, levelName: '银卡会员', business: '餐饮', discount: 0.95, note: '' },
    { id: '3', level: 2, levelName: '银卡会员', business: '娱乐', discount: 0.95, note: '' },
    { id: '4', level: 3, levelName: '金卡会员', business: '餐饮', discount: 0.9, note: '' },
    { id: '5', level: 3, levelName: '金卡会员', business: '娱乐', discount: 0.88, note: '周末特惠' },
    { id: '6', level: 3, levelName: '金卡会员', business: '购物', discount: 0.92, note: '' },
    { id: '7', level: 4, levelName: '铂金会员', business: '全部业态', discount: 0.85, note: '' },
    { id: '8', level: 5, levelName: '钻石会员', business: '全部业态', discount: 0.8, note: '全场通用' },
  ]);

  const [activities, setActivities] = useState([
    { id: '1', name: '夏日特惠', type: '限时折扣', startDate: '2024-06-01', endDate: '2024-08-31', discount: 0.85, status: 'active' },
    { id: '2', name: '会员日活动', type: '固定折扣', startDate: '2024-01-01', endDate: '2024-12-31', discount: 0.9, status: 'active' },
    { id: '3', name: '春节特惠', type: '限时折扣', startDate: '2024-01-20', endDate: '2024-02-24', discount: 0.8, status: 'ended' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setEditingDiscount(null);
    setShowModal(true);
  };

  const handleEdit = (discount: any) => {
    setEditingDiscount(discount);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该折扣规则吗？')) {
      setDiscounts(discounts.filter(d => d.id !== id));
      toast.success('删除成功');
    }
  };

  const handleSave = () => {
    if (editingDiscount) {
      setDiscounts(discounts.map(d => d.id === editingDiscount.id ? { ...d, ...editingDiscount } : d));
      toast.success('更新成功');
    } else {
      const newDiscount = { ...editingDiscount, id: String(Date.now()) };
      setDiscounts([...discounts, newDiscount]);
      toast.success('创建成功');
    }
    setShowModal(false);
    setEditingDiscount(null);
  };

  const filteredDiscounts = discounts.filter(d =>
    d.levelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.business.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 会员折扣规则 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">会员折扣规则</h2>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            新增规则
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索会员等级或业态..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">会员等级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">适用业态</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">折扣率</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">备注</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDiscounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        discount.level === 1 ? 'bg-gray-100 text-gray-800' :
                        discount.level === 2 ? 'bg-gray-200 text-gray-800' :
                        discount.level === 3 ? 'bg-yellow-100 text-yellow-800' :
                        discount.level === 4 ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {discount.levelName}
                      </span>
                    </td>
                    <td className="px-4 py-3">{discount.business}</td>
                    <td className="px-4 py-3 text-center">
                      <Percent className="w-4 h-4 text-green-600 inline mr-1" />
                      {(discount.discount * 10).toFixed(0)}折
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{discount.note || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(discount)} className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(discount.id)} className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 营销活动 */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">营销活动</h3>
        <div className="grid grid-cols-3 gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{activity.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status === 'active' ? '进行中' : '已结束'}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <Tag className="w-3 h-3 inline mr-1" />
                {activity.type}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {activity.startDate} - {activity.endDate}
              </div>
              <div className="mt-2 text-lg font-bold text-red-600">
                {(activity.discount * 10).toFixed(0)}折
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingDiscount ? '编辑折扣规则' : '新增折扣规则'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">会员等级</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="1">普通会员</option>
              <option value="2">银卡会员</option>
              <option value="3">金卡会员</option>
              <option value="4">铂金会员</option>
              <option value="5">钻石会员</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">适用业态</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">折扣率</label>
            <input
              type="number"
              step="0.01"
              min="0.5"
              max="1"
              defaultValue={editingDiscount?.discount || '1.0'}
              onChange={(e) => setEditingDiscount({ ...editingDiscount, discount: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <input
              type="text"
              defaultValue={editingDiscount?.note}
              onChange={(e) => setEditingDiscount({ ...editingDiscount, note: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="可选"
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