import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { FileText, Plus, Edit, Calendar } from 'lucide-react';

export default function AdminLease() {
  const [showModal, setShowModal] = useState(false);
  const [editingLease, setEditingLease] = useState<any>(null);

  const handleAdd = () => {
    setEditingLease(null);
    setShowModal(true);
  };

  const handleEdit = (lease: any) => {
    setEditingLease(lease);
    setShowModal(true);
  };

  const handleSave = () => {
    toast.success(editingLease ? '更新成功' : '创建成功');
    setShowModal(false);
    setEditingLease(null);
  };

  const leases = [
    { id: '1', tenant: '王中王超市', asset: 'A区101商铺', startDate: '2024-01-01', endDate: '2025-12-31', rent: 15000, propertyFee: 1500, status: 'active' },
    { id: '2', tenant: '星巴克咖啡', asset: 'B区102商铺', startDate: '2024-03-01', endDate: '2026-02-28', rent: 12000, propertyFee: 1200, status: 'active' },
    { id: '3', tenant: '优衣库', asset: 'C区101商铺', startDate: '2023-06-01', endDate: '2025-05-31', rent: 18000, propertyFee: 1800, status: 'expiring' },
    { id: '4', tenant: '海底捞', asset: 'D区201商铺', startDate: '2024-02-01', endDate: '2027-01-31', rent: 25000, propertyFee: 2500, status: 'active' },
  ];

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string }> = {
      active: { text: '正常', className: 'bg-green-100 text-green-800' },
      expiring: { text: '即将到期', className: 'bg-yellow-100 text-yellow-800' },
      expired: { text: '已到期', className: 'bg-red-100 text-red-800' },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">租赁管理</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新增合同
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">租户名称</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">租赁资产</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">租期</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">月租金</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">物业费</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => {
              const statusInfo = getStatusInfo(lease.status);
              return (
                <tr key={lease.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">{lease.tenant}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{lease.asset}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {lease.startDate} - {lease.endDate}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">¥{lease.rent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm">¥{lease.propertyFee.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${statusInfo.className}`}>
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(lease)}
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLease ? '编辑租赁合同' : '新增租赁合同'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="租户名称"
              defaultValue={editingLease?.tenant}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="租赁资产"
              defaultValue={editingLease?.asset}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              defaultValue={editingLease?.startDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              defaultValue={editingLease?.endDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="月租金"
              defaultValue={editingLease?.rent}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="物业费"
              defaultValue={editingLease?.propertyFee}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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