import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Building2, Plus, Edit, Search } from 'lucide-react';

export default function AdminAssets() {
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setEditingAsset(null);
    setShowModal(true);
  };

  const handleEdit = (asset: any) => {
    setEditingAsset(asset);
    setShowModal(true);
  };

  const handleSave = () => {
    toast.success(editingAsset ? '更新成功' : '创建成功');
    setShowModal(false);
    setEditingAsset(null);
  };

  const assets = [
    { id: '1', name: 'A区101商铺', type: 'shop', area: 120, floor: 1, status: 'rented', rent: 15000 },
    { id: '2', name: 'B区201办公室', type: 'office', area: 80, floor: 2, status: 'available', rent: 8000 },
    { id: '3', name: 'C区301仓库', type: 'warehouse', area: 200, floor: 3, status: 'available', rent: 5000 },
    { id: '4', name: 'A区102商铺', type: 'shop', area: 90, floor: 1, status: 'rented', rent: 12000 },
    { id: '5', name: 'D区401办公室', type: 'office', area: 150, floor: 4, status: 'maintenance', rent: 15000 },
  ];

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeText = (type: string) => {
    const types: Record<string, string> = {
      shop: '商铺',
      office: '办公室',
      warehouse: '仓库',
    };
    return types[type] || type;
  };

  const getStatusText = (status: string) => {
    const statuses: Record<string, { text: string; className: string }> = {
      available: { text: '可租', className: 'bg-green-100 text-green-800' },
      rented: { text: '已租', className: 'bg-blue-100 text-blue-800' },
      maintenance: { text: '维护中', className: 'bg-yellow-100 text-yellow-800' },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">房屋资产档案</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新增资产
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索资产名称..."
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
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">资产名称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">类型</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">面积(㎡)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">楼层</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">月租金</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const statusInfo = getStatusText(asset.status);
                return (
                  <tr key={asset.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">{asset.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{getTypeText(asset.type)}</td>
                    <td className="py-3 px-4 text-sm">{asset.area}</td>
                    <td className="py-3 px-4 text-sm">{asset.floor}层</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded ${statusInfo.className}`}>
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">¥{asset.rent.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(asset)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingAsset ? '编辑资产' : '新增资产'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="资产名称"
              defaultValue={editingAsset?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="shop">商铺</option>
              <option value="office">办公室</option>
              <option value="warehouse">仓库</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="面积(㎡)"
              defaultValue={editingAsset?.area}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="楼层"
              defaultValue={editingAsset?.floor}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="月租金"
              defaultValue={editingAsset?.rent}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="available">可租</option>
              <option value="rented">已租</option>
              <option value="maintenance">维护中</option>
            </select>
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