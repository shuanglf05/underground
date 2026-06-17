import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { FileText, Plus, Edit, Search, Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function AdminFees() {
  const [fees, setFees] = useState([
    { id: 'F001', tenant: '王中王超市', type: '物业费', amount: 1500, period: '2024-01', status: 'paid', payTime: '2024-01-10' },
    { id: 'F002', tenant: '星巴克咖啡', type: '物业费', amount: 1200, period: '2024-01', status: 'paid', payTime: '2024-01-15' },
    { id: 'F003', tenant: '优衣库', type: '物业费', amount: 1800, period: '2024-01', status: 'unpaid', payTime: '' },
    { id: 'F004', tenant: '海底捞', type: '物业费', amount: 2500, period: '2024-01', status: 'unpaid', payTime: '' },
    { id: 'F005', tenant: '王中王超市', type: '水电费', amount: 3500, period: '2024-01', status: 'paid', payTime: '2024-01-12' },
    { id: 'F006', tenant: '星巴克咖啡', type: '水电费', amount: 800, period: '2024-01', status: 'pending', payTime: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredFees = fees.filter(fee =>
    fee.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    return status === 'paid' 
      ? { text: '已缴纳', className: 'bg-green-100 text-green-800', icon: CheckCircle }
      : status === 'pending'
      ? { text: '待审核', className: 'bg-yellow-100 text-yellow-800', icon: Clock }
      : { text: '未缴纳', className: 'bg-red-100 text-red-800', icon: Clock };
  };

  const handlePay = (fee: any) => {
    setFees(fees.map(f => 
      f.id === fee.id 
        ? { ...f, status: 'paid', payTime: new Date().toLocaleDateString('zh-CN') }
        : f
    ));
    toast.success('缴费成功');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">费用收缴管理</h2>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新增费用单
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">已收缴</span>
          </div>
          <div className="text-2xl font-bold text-green-600">¥6,000</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-500">待审核</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">¥800</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-500">未缴纳</span>
          </div>
          <div className="text-2xl font-bold text-red-600">¥4,300</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索租户或费用类型..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">单号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">租户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">费用类型</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">金额</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">账期</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFees.map((fee) => {
                const statusInfo = getStatusInfo(fee.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={fee.id}>
                    <td className="px-4 py-3 font-medium text-blue-600">{fee.id}</td>
                    <td className="px-4 py-3">{fee.tenant}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{fee.type}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-medium">¥{fee.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <Calendar className="w-4 h-4 text-gray-400 inline mr-1" />
                      {fee.period}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {fee.status !== 'paid' && (
                        <Button size="sm" onClick={() => handlePay(fee)}>
                          缴纳
                        </Button>
                      )}
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
        title="新增费用单"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">租户名称</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="王中王超市">王中王超市</option>
              <option value="星巴克咖啡">星巴克咖啡</option>
              <option value="优衣库">优衣库</option>
              <option value="海底捞">海底捞</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">费用类型</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="物业费">物业费</option>
              <option value="水电费">水电费</option>
              <option value="取暖费">取暖费</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">金额</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">账期</label>
            <input
              type="month"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={() => { toast.success('创建成功'); setShowModal(false); }}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}