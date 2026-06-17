import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Cpu, Plus, Edit, Settings } from 'lucide-react';

export default function AdminDevices() {
  const [showModal, setShowModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState<any>(null);
  const [configDevice, setConfigDevice] = useState<any>(null);

  const handleAdd = () => {
    setEditingDevice(null);
    setShowModal(true);
  };

  const handleEdit = (device: any) => {
    setEditingDevice(device);
    setShowModal(true);
  };

  const handleConfig = (device: any) => {
    setConfigDevice(device);
    setShowConfigModal(true);
  };

  const handleSave = () => {
    toast.success(editingDevice ? '更新成功' : '创建成功');
    setShowModal(false);
    setEditingDevice(null);
  };

  const handleConfigSave = () => {
    toast.success('配置更新成功');
    setShowConfigModal(false);
    setConfigDevice(null);
  };

  const devices = [
    { id: '1', name: '入口闸机1号', type: 'entrance', location: '主入口', status: 'online' },
    { id: '2', name: '智能手环发放机', type: 'bracelet', location: '服务中心', status: 'online' },
    { id: '3', name: '储物柜A区', type: 'locker', location: 'A区更衣室', status: 'maintenance' },
    { id: '4', name: '游戏设备1号', type: 'game', location: '游戏区', status: 'online' },
    { id: '5', name: '自动售货机', type: 'vending', location: '休息区', status: 'offline' },
    { id: '6', name: '入口闸机2号', type: 'entrance', location: '次入口', status: 'online' },
    { id: '7', name: 'VR设备01', type: 'vr', location: 'VR体验区', status: 'online' },
    { id: '8', name: '台球桌-03', type: 'billiards', location: '台球区', status: 'online' },
  ];

  const getTypeText = (type: string) => {
    const types: Record<string, string> = {
      entrance: '入口闸机',
      bracelet: '手环设备',
      locker: '储物柜',
      game: '游戏设备',
      vending: '售货机',
      vr: 'VR设备',
      billiards: '台球桌',
    };
    return types[type] || type;
  };

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string }> = {
      online: { text: '在线', className: 'bg-green-100 text-green-800' },
      offline: { text: '离线', className: 'bg-red-100 text-red-800' },
      maintenance: { text: '维护中', className: 'bg-yellow-100 text-yellow-800' },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">设备资产台账</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新增设备
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">设备名称</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">类型</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">位置</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const statusInfo = getStatusInfo(device.status);
              return (
                <tr key={device.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{device.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{getTypeText(device.type)}</td>
                  <td className="py-3 px-4 text-sm">{device.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${statusInfo.className}`}>
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(device)}
                      className="p-1 hover:bg-gray-100 rounded mr-2"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleConfig(device)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Settings className="w-4 h-4 text-gray-600" />
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
        title={editingDevice ? '编辑设备' : '新增设备'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="设备名称"
              defaultValue={editingDevice?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="entrance">入口闸机</option>
              <option value="bracelet">手环设备</option>
              <option value="locker">储物柜</option>
              <option value="game">游戏设备</option>
              <option value="vending">售货机</option>
              <option value="vr">VR设备</option>
              <option value="billiards">台球桌</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="位置"
              defaultValue={editingDevice?.location}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} variant="outline">取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`配置: ${configDevice?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">设备IP</label>
            <input
              type="text"
              placeholder="192.168.1.100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">端口号</label>
            <input
              type="number"
              defaultValue={8080}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">通信协议</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="mqtt">MQTT</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setShowConfigModal(false)} variant="outline">取消</Button>
            <Button onClick={handleConfigSave}>保存配置</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}