import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Building2, Plus, Edit, Trash2, Search, MapPin, DollarSign, Calendar } from 'lucide-react';

export default function AdminInvestment() {
  const [investments, setInvestments] = useState([
    { id: 'INV001', title: 'A区101商铺招租', area: '120㎡', floor: '1层', price: 15000, status: 'available', description: '位于主入口，人流量大，适合零售' },
    { id: 'INV002', title: 'B区201办公室', area: '80㎡', floor: '2层', price: 8000, status: 'available', description: '采光好，适合小型办公' },
    { id: 'INV003', title: 'C区301仓库', area: '200㎡', floor: '3层', price: 5000, status: 'rented', description: '空间宽敞，适合仓储' },
    { id: 'INV004', title: 'A区102商铺', area: '90㎡', floor: '1层', price: 12000, status: 'negotiating', description: '位置优越，适合餐饮' },
    { id: 'INV005', title: 'D区401办公室', area: '150㎡', floor: '4层', price: 15000, status: 'available', description: '整层办公，适合中型企业' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredInvestments = investments.filter(inv =>
    inv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    return status === 'available'
      ? { text: '可出租', className: 'bg-green-100 text-green-800' }
      : status === 'negotiating'
      ? { text: '洽谈中', className: 'bg-yellow-100 text-yellow-800' }
      : { text: '已出租', className: 'bg-gray-100 text-gray-800' };
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该招租信息吗？')) {
      setInvestments(investments.filter(inv => inv.id !== id));
      toast.success('删除成功');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">招租信息发布</h2>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          发布招租信息
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索招租信息..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {filteredInvestments.map((inv) => {
            const statusInfo = getStatusInfo(inv.status);
            return (
              <div key={inv.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{inv.title}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${statusInfo.className}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {inv.floor} / {inv.area}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ¥{inv.price.toLocaleString()}/月
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{inv.description}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    <Edit className="w-4 h-4 inline mr-1" />
                    编辑
                  </button>
                  <button 
                    onClick={() => handleDelete(inv.id)}
                    className="flex-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" />
                    删除
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="发布招租信息"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="招租信息标题"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">面积(㎡)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">楼层</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="如：1层"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">租金(元/月)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="描述该物业的特点和优势..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={() => { toast.success('发布成功'); setShowModal(false); }}>发布</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}