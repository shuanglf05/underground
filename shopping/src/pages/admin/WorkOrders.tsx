import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { AlertTriangle, Plus, Edit, Check, X, Bell, User, Clock, Search } from 'lucide-react';

export default function AdminWorkOrders() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setEditingOrder(null);
    setShowModal(true);
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleViewDetail = (order: any) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleSave = () => {
    toast.success(editingOrder ? '更新成功' : '创建成功');
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleStatusChange = (order: any, status: string) => {
    toast.success(`工单状态已更新为: ${status === 'completed' ? '已修复' : status === 'inProgress' ? '维修中' : '待接单'}`);
  };

  const workOrders = [
    { id: 'WO20240201', device: '储物柜A区', type: 'locker', reporter: '张小明', reportTime: '2024-02-01 10:30', status: 'completed', assignee: '李师傅', description: '储物柜门无法关闭', repairTime: '2024-02-01 14:00', repairNote: '更换门锁' },
    { id: 'WO20240202', device: '游戏设备1号', type: 'game', reporter: '王小红', reportTime: '2024-02-02 11:15', status: 'inProgress', assignee: '王师傅', description: '游戏画面卡顿', repairTime: '', repairNote: '' },
    { id: 'WO20240203', device: '自动售货机', type: 'vending', reporter: '赵大伟', reportTime: '2024-02-03 09:00', status: 'pending', assignee: '', description: '售货机无法出货', repairTime: '', repairNote: '' },
    { id: 'WO20240204', device: '入口闸机1号', type: 'entrance', reporter: '李经理', reportTime: '2024-02-03 14:20', status: 'pending', assignee: '', description: '闸机刷卡无反应', repairTime: '', repairNote: '' },
    { id: 'WO20240205', device: 'VR设备01', type: 'vr', reporter: '陈主管', reportTime: '2024-02-04 10:00', status: 'inProgress', assignee: '李师傅', description: 'VR眼镜显示异常', repairTime: '', repairNote: '' },
  ];

  const filteredOrders = workOrders.filter(order =>
    order.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeText = (type: string) => {
    const types: Record<string, string> = {
      entrance: '门禁',
      locker: '储物柜',
      game: '游乐设备',
      vending: '售货机',
      vr: 'VR设备',
    };
    return types[type] || type;
  };

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string; icon: React.ElementType }> = {
      pending: { text: '待接单', className: 'bg-gray-100 text-gray-800', icon: Clock },
      inProgress: { text: '维修中', className: 'bg-blue-100 text-blue-800', icon: Bell },
      completed: { text: '已修复', className: 'bg-green-100 text-green-800', icon: Check },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800', icon: AlertTriangle };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">故障工单管理</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新建工单
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设备名称或报修人..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">工单编号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">设备名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">报修人</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">报修时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-blue-600">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.device}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded">{getTypeText(order.type)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {order.reporter}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.reportTime}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(order)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="px-2 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        >
                          详情
                        </button>
                        {order.status !== 'completed' && (
                          <select
                            defaultValue={order.status}
                            onChange={(e) => handleStatusChange(order, e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">待接单</option>
                            <option value="inProgress">维修中</option>
                            <option value="completed">已修复</option>
                          </select>
                        )}
                      </div>
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
        title={editingOrder ? '编辑工单' : '新建工单'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="设备名称"
              defaultValue={editingOrder?.device}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="locker">储物柜</option>
              <option value="game">游乐设备</option>
              <option value="vending">售货机</option>
              <option value="entrance">门禁</option>
              <option value="vr">VR设备</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="报修人"
              defaultValue={editingOrder?.reporter}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="负责人（选填）"
              defaultValue={editingOrder?.assignee}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">故障描述</label>
            <textarea
              placeholder="请描述故障情况..."
              defaultValue={editingOrder?.description}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`工单详情: ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">设备名称</p>
                <p className="font-medium">{selectedOrder.device}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">设备类型</p>
                <p className="font-medium">{getTypeText(selectedOrder.type)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">报修人</p>
                <p className="font-medium">{selectedOrder.reporter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">负责人</p>
                <p className="font-medium">{selectedOrder.assignee || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">报修时间</p>
                <p className="font-medium">{selectedOrder.reportTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">状态</p>
                <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusInfo(selectedOrder.status).className}`}>
                  {getStatusInfo(selectedOrder.status).text}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">故障描述</p>
              <p className="font-medium">{selectedOrder.description}</p>
            </div>
            {selectedOrder.repairTime && (
              <>
                <div>
                  <p className="text-sm text-gray-500">修复时间</p>
                  <p className="font-medium">{selectedOrder.repairTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">修复备注</p>
                  <p className="font-medium">{selectedOrder.repairNote}</p>
                </div>
              </>
            )}
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowDetailModal(false)} variant="outline">关闭</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}