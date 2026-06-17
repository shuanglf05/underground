import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { AlertCircle, Plus, Check, X, Search, FileText } from 'lucide-react';

const wasteTypes = ['过期', '变质', '破损', '丢失'];
const statusOptions = [
  { value: 'pending', label: '待审批' },
  { value: 'approved', label: '已批准' },
  { value: 'rejected', label: '已拒绝' },
];

export default function AdminWaste() {
  const [wasteRecords, setWasteRecords] = useState([
    { id: 'WS001', product: '矿泉水', sku: 'P001', quantity: 5, type: '过期', amount: 7.50, reason: '保质期已到', applicant: '张三', status: 'approved', date: '2024-06-14' },
    { id: 'WS002', product: '薯片', sku: 'P003', quantity: 3, type: '破损', amount: 15.00, reason: '运输过程中挤压破损', applicant: '李四', status: 'pending', date: '2024-06-15' },
    { id: 'WS003', product: '可乐', sku: 'P002', quantity: 2, type: '变质', amount: 5.00, reason: '存储不当导致变质', applicant: '张三', status: 'approved', date: '2024-06-13' },
    { id: 'WS004', product: '羽毛球拍', sku: 'P004', quantity: 1, type: '丢失', amount: 80.00, reason: '仓库盘点发现丢失', applicant: '王五', status: 'rejected', date: '2024-06-12' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    toast.success('损耗申请提交成功，等待审批');
    setShowModal(false);
  };

  const handleApprove = (id: string) => {
    setWasteRecords(wasteRecords.map(w => w.id === id ? { ...w, status: 'approved' } : w));
    toast.success('审批通过，库存已调整');
  };

  const handleReject = (id: string) => {
    setWasteRecords(wasteRecords.map(w => w.id === id ? { ...w, status: 'rejected' } : w));
    toast.success('已拒绝该申请');
  };

  const filteredRecords = wasteRecords.filter(record => {
    const matchKeyword = !searchKeyword || record.product.includes(searchKeyword) || record.sku.includes(searchKeyword);
    const matchStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchKeyword && matchStatus;
  });

  const totalAmount = wasteRecords.filter(w => w.status === 'approved').reduce((sum, w) => sum + w.amount, 0);
  const pendingCount = wasteRecords.filter(w => w.status === 'pending').length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">损耗与报损管理</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索商品"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> 发起报损
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">本月报损金额</p>
              <p className="text-xl font-bold text-red-600">¥{totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待审批</p>
              <p className="text-xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已批准</p>
              <p className="text-xl font-bold text-green-600">
                {wasteRecords.filter(w => w.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已拒绝</p>
              <p className="text-xl font-bold text-gray-600">
                {wasteRecords.filter(w => w.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">状态筛选：</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">全部状态</option>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">报损单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">报损类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">金额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">申请人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">¥{record.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.applicant}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'approved' ? 'bg-green-100 text-green-800' :
                    record.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status === 'approved' ? '已批准' :
                     record.status === 'rejected' ? '已拒绝' : '待审批'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(record.id)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        批准
                      </button>
                      <button
                        onClick={() => handleReject(record.id)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        拒绝
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="发起报损申请"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>请选择商品</option>
                <option>矿泉水</option>
                <option>可乐</option>
                <option>薯片</option>
                <option>羽毛球拍</option>
                <option>VR眼镜</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">报损类型</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {wasteTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">报损数量</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入报损数量"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">报损原因</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请详细描述报损原因..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">提交申请</button>
          </div>
        </div>
      </Modal>
    </>
  );
}