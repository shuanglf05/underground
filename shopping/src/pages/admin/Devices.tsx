import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { Cpu, Power, PowerOff, RotateCcw, AlertTriangle, Plus, Search, RefreshCw, X } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  type: string;
  location: string;
  status: string;
  usageCount: number;
  totalUsageHours: number;
  errorCount: number;
  lastMaintenance: string;
}

interface Alert {
  deviceId: number;
  deviceName: string;
  message: string;
  time: string;
}

const deviceTypeLabels: Record<string, string> = {
  gate: '门禁闸机',
  bracelet: '智能手环',
  game: '游乐设备',
  vending: '售货机',
  locker: '储物柜',
  pos: 'POS机',
};

export default function AdminDevices() {
  const [activeTab, setActiveTab] = useState('devices');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState({ online: 0, offline: 0, error: 0, total: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', type: 'gate', location: '' });
  const [importFile, setImportFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === 'devices') {
      const res = await fetch(`/api/devices${searchKeyword ? `?keyword=${searchKeyword}` : ''}`);
      const data = await res.json();
      if (data.success) setDevices(data.data.list);
    } else if (activeTab === 'alerts') {
      const res = await fetch('/api/devices/alerts');
      const data = await res.json();
      if (data.success) setAlerts(data.data);
    }
    fetchStats();
  };

  const fetchStats = async () => {
    const res = await fetch('/api/devices/stats');
    const data = await res.json();
    if (data.success) setStats(data.data);
  };

  const handleAddDevice = async () => {
    const res = await fetch('/api/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDevice),
    });
    const data = await res.json();
    if (data.success) {
      setDevices([data.data, ...devices]);
      setShowAddModal(false);
      setNewDevice({ name: '', type: 'gate', location: '' });
    }
  };

  const handleControlDevice = async (id: number, action: 'start' | 'stop' | 'restart') => {
    const res = await fetch(`/api/devices/${id}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (data.success) {
      setDevices(devices.map(d => d.id === id ? data.data : d));
    }
  };

  const handleImportDevices = async () => {
    if (!importFile) return;
    const formData = new FormData();
    formData.append('file', importFile);
    const res = await fetch('/api/devices/import', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setShowImportModal(false);
      setImportFile(null);
      fetchData();
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: typeof Power }> = {
      online: { bg: 'bg-green-100', text: 'text-green-600', label: '在线', icon: Power },
      offline: { bg: 'bg-red-100', text: 'text-red-600', label: '离线', icon: PowerOff },
      error: { bg: 'bg-orange-100', text: 'text-orange-600', label: '异常', icon: AlertTriangle },
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status, icon: Cpu };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">设备管理</h1>
            <p className="text-sm text-gray-500">智能设备监控与控制</p>
          </div>
          <button
            onClick={() => { fetchData(); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            刷新状态
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-500">设备总数</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Power className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">在线设备</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.online}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <PowerOff className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-500">离线设备</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.offline}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-500">异常设备</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.error}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setActiveTab('devices'); setSearchKeyword(''); }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'devices' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Cpu className="w-5 h-5" />
              设备列表
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'alerts' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              设备告警
              {alerts.length > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {alerts.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'devices' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索设备名称或位置..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowImportModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                      导入设备
                    </button>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      添加设备
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices.map((device) => {
                    const badge = getStatusBadge(device.status);
                    const StatusIcon = badge.icon;
                    return (
                      <div key={device.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-lg ${badge.bg} flex items-center justify-center`}>
                              <Cpu className={`w-5 h-5 ${badge.text}`} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">{device.name}</h3>
                              <p className="text-xs text-gray-500">{deviceTypeLabels[device.type] || device.type}</p>
                            </div>
                          </div>
                          <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {device.location}
                          </p>
                          <div className="flex items-center gap-4">
                            <span>使用次数: {device.usageCount}</span>
                            <span>运行时长: {device.totalUsageHours}h</span>
                          </div>
                          {device.errorCount > 0 && (
                            <p className="text-orange-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" />
                              异常次数: {device.errorCount}
                            </p>
                          )}
                        </div>
                        {device.status !== 'offline' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleControlDevice(device.id, 'start')}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                            >
                              <Power className="w-4 h-4" />
                              启动
                            </button>
                            <button
                              onClick={() => handleControlDevice(device.id, 'stop')}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                            >
                              <PowerOff className="w-4 h-4" />
                              停止
                            </button>
                            <button
                              onClick={() => handleControlDevice(device.id, 'restart')}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                            >
                              <RotateCcw className="w-4 h-4" />
                              重启
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-3">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{alert.deviceName}</h3>
                          <p className="text-sm text-orange-600">{alert.message}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{alert.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">暂无设备告警</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">添加设备</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">设备名称</label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">设备类型</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Object.entries(deviceTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">安装位置</label>
                <input
                  type="text"
                  value={newDevice.location}
                  onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Device Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">批量导入设备</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer"
                onClick={() => document.getElementById('import-file')?.click()}
              >
                <RefreshCw className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">点击或拖拽上传设备列表文件</p>
                <p className="text-sm text-gray-400 mt-1">支持 Excel (.xlsx) 格式</p>
                <input
                  id="import-file"
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                />
              </div>
              {importFile && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">{importFile.name}</span>
                  <button
                    onClick={() => setImportFile(null)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-400">
                导入格式说明：设备名称、设备类型、安装位置（每行一个设备）
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleImportDevices}
                disabled={!importFile}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                确认导入
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
