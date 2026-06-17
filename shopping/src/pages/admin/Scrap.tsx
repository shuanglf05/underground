import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Trash2, Plus, Edit, Search, Calendar, AlertTriangle } from 'lucide-react';

export default function AdminScrap() {
  const [scraps, setScraps] = useState([
    { id: 'S001', device: '储物柜B区', reason: '老化严重', scrapDate: '2024-01-10', status: 'completed', approver: '李经理' },
    { id: 'S002', device: '游戏设备2号', reason: '无法修复', scrapDate: '2024-01-15', status: 'completed', approver: '王主管' },
    { id: 'S003', device: 'VR设备02', reason: '配件短缺', scrapDate: '2024-01-20', status: 'pending', approver: '' },
    { id: 'S004', device: '自动售币机', reason: '故障频繁', scrapDate: '2024-01-22', status: 'pending', approver: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredItems = scraps.filter(s =>
    s.device.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    return status === 'completed'
      ? { text: '已报废', className: 'bg-red-100 text-red-800' }
      : { text: '待审批', className: 'bg-yellow-100 text-yellow-800' };
  };

  const handleApprove = (scrap: any) => {
    setScraps(scraps.map(s =>
      s.id === scrap.id
        ? { ...s, status: 'completed', approver: '当前用户' }
        : s
    ));
    toast.success('审批通过');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">报废管理</h2>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          申请报废
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设备名称..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">设备名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">报废原因</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">申请日期</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">审批人</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <Trash2 className="w-4 h-4 text-gray-400 inline mr-2" />
                      {item.device}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        {item.reason}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Calendar className="w-4 h-4 text-gray-400 inline mr-1" />
                      {item.scrapDate}
                    </td>
                    <td className="px-4 py-3 text-center">{item.approver || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.status === 'pending' && (
                        <Button size="sm" onClick={() => handleApprove(item)}>
                          审批通过
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
        title="申请报废"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">设备名称</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="储物柜B区">储物柜B区</option>
              <option value="游戏设备2号">游戏设备2号</option>
              <option value="VR设备02">VR设备02</option>
              <option value="自动售币机">自动售币机</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">报废原因</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="请描述报废原因..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">预计报废日期</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={() => { toast.success('申请提交成功'); setShowModal(false); }}>提交申请</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}