import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Wrench, Plus, Edit, Search, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function AdminMaintenance() {
  const [maintenances, setMaintenances] = useState([
    { id: 'MT001', device: '储物柜A区', type: '定期维护', date: '2024-01-15', status: 'completed', technician: '李师傅', note: '更换门锁' },
    { id: 'MT002', device: '游戏设备1号', type: '故障维修', date: '2024-01-14', status: 'completed', technician: '王师傅', note: '修复卡顿问题' },
    { id: 'MT003', device: '入口闸机1号', type: '定期维护', date: '2024-01-20', status: 'pending', technician: '', note: '' },
    { id: 'MT004', device: 'VR设备01', type: '故障维修', date: '2024-01-18', status: 'inProgress', technician: '李师傅', note: '检查显示异常' },
    { id: 'MT005', device: '自动售货机', type: '定期维护', date: '2024-01-25', status: 'pending', technician: '', note: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredItems = maintenances.filter(m =>
    m.device.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    return status === 'completed'
      ? { text: '已完成', className: 'bg-green-100 text-green-800', icon: CheckCircle }
      : status === 'inProgress'
      ? { text: '进行中', className: 'bg-blue-100 text-blue-800', icon: Clock }
      : { text: '待执行', className: 'bg-gray-100 text-gray-800', icon: Clock };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">设备维保管理</h2>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新增维保计划
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">维保类型</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">计划日期</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">负责人</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">备注</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <Wrench className="w-4 h-4 text-gray-400 inline mr-2" />
                      {item.device}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{item.type}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Calendar className="w-4 h-4 text-gray-400 inline mr-1" />
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-center">{item.technician || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.note || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="p-1 hover:bg-gray-100 rounded">
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
        title="新增维保计划"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">设备名称</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="储物柜A区">储物柜A区</option>
              <option value="游戏设备1号">游戏设备1号</option>
              <option value="入口闸机1号">入口闸机1号</option>
              <option value="VR设备01">VR设备01</option>
              <option value="自动售货机">自动售货机</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">维保类型</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="定期维护">定期维护</option>
              <option value="故障维修">故障维修</option>
              <option value="升级改造">升级改造</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">计划日期</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">未分配</option>
              <option value="李师傅">李师傅</option>
              <option value="王师傅">王师傅</option>
            </select>
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