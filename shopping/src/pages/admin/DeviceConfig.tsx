import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import { Settings, Wifi, Shield, Lock, Gamepad2, Package, Coins, Monitor, Server } from 'lucide-react';

export default function AdminDeviceConfig() {
  const { type } = useParams<{ type?: string }>();
  const activeType = type || 'access';

  const configs: Record<string, { title: string; icon: React.ElementType; color: string }> = {
    access: { title: '门禁系统', icon: Shield, color: 'blue' },
    bracelet: { title: '智能手环', icon: Wifi, color: 'green' },
    locker: { title: '智能储物柜', icon: Lock, color: 'purple' },
    game: { title: '游乐设备控制', icon: Gamepad2, color: 'orange' },
    vending: { title: '无人售货柜', icon: Package, color: 'cyan' },
    coin: { title: '自动售币机', icon: Coins, color: 'yellow' },
    kitchen: { title: '厨房显示系统', icon: Monitor, color: 'red' },
    gateway: { title: '边缘网关管理', icon: Server, color: 'indigo' },
  };

  const config = configs[activeType] || configs.access;
  const Icon = config.icon;

  const [devices, setDevices] = useState([
    { id: 'D001', name: `${config.title}设备1`, status: 'online', ip: '192.168.1.101', port: '8080' },
    { id: 'D002', name: `${config.title}设备2`, status: 'online', ip: '192.168.1.102', port: '8080' },
    { id: 'D003', name: `${config.title}设备3`, status: 'offline', ip: '192.168.1.103', port: '8080' },
    { id: 'D004', name: `${config.title}设备4`, status: 'online', ip: '192.168.1.104', port: '8080' },
  ]);

  const getColorClass = (color: string, type: 'bg' | 'text') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
      red: { bg: 'bg-red-50', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    };
    return colors[color]?.[type] || '';
  };

  const handleRestart = (device: any) => {
    toast.success(`${device.name} 重启成功`);
  };

  const handleSync = () => {
    toast.success('配置同步完成');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
        <Button onClick={handleSync}>
          <Settings className="w-4 h-4 mr-2" />
          同步配置
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className={`${getColorClass(config.color, 'bg')} rounded-lg p-4`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getColorClass(config.color, 'bg')}`}>
              <Icon className={`w-6 h-6 ${getColorClass(config.color, 'text')}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{devices.length}</div>
              <div className="text-sm text-gray-500">设备总数</div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{devices.filter(d => d.status === 'online').length}</div>
              <div className="text-sm text-gray-500">在线设备</div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Settings className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{devices.filter(d => d.status === 'offline').length}</div>
              <div className="text-sm text-gray-500">离线设备</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-500">连通率</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">设备名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">IP地址</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">端口</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-4 py-3">
                    <Icon className={`w-5 h-5 ${getColorClass(config.color, 'text')} inline mr-2`} />
                    {device.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{device.ip}</td>
                  <td className="px-4 py-3 text-center">{device.port}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status === 'online' ? '在线' : '离线'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleRestart(device)}
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                      重启
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">配置参数</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">通信协议</label>
            <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="mqtt">MQTT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">超时时间(秒)</label>
            <input
              type="number"
              defaultValue={30}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">重试次数</label>
            <input
              type="number"
              defaultValue={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => toast.success('配置保存成功')}>保存配置</Button>
        </div>
      </div>
    </>
  );
}