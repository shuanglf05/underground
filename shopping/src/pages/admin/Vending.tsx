import React, { useState } from 'react';
import { toast } from '../../components/ui/Toast';
import { Package, RefreshCw, AlertTriangle, Check, Download, Search } from 'lucide-react';

const vendingMachines = [
  { id: 'V001', name: '休息区售货柜1', location: '休息区A区', status: 'online', lastSync: '2024-06-15 14:30:00', items: 45 },
  { id: 'V002', name: '休息区售货柜2', location: '休息区B区', status: 'online', lastSync: '2024-06-15 14:28:00', items: 38 },
  { id: 'V003', name: '游乐区售货柜', location: 'VR体验区', status: 'error', lastSync: '2024-06-15 10:15:00', items: 22 },
  { id: 'V004', name: '餐饮区售货柜', location: '餐饮区', status: 'online', lastSync: '2024-06-15 14:25:00', items: 52 },
  { id: 'V005', name: '台球区售货柜', location: '台球区', status: 'offline', lastSync: '2024-06-14 18:00:00', items: 15 },
];

const salesRecords = [
  { id: '1', machine: 'V001', product: '矿泉水', quantity: 2, amount: 4.00, time: '2024-06-15 14:30:00' },
  { id: '2', machine: 'V001', product: '可乐', quantity: 1, amount: 3.50, time: '2024-06-15 14:28:00' },
  { id: '3', machine: 'V002', product: '薯片', quantity: 1, amount: 8.00, time: '2024-06-15 14:25:00' },
  { id: '4', machine: 'V004', product: '矿泉水', quantity: 3, amount: 6.00, time: '2024-06-15 14:20:00' },
  { id: '5', machine: 'V001', product: '可乐', quantity: 2, amount: 7.00, time: '2024-06-15 14:15:00' },
];

export default function AdminVending() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleSync = (id: string) => {
    toast.success(`${id} 同步完成`);
  };

  const handleSyncAll = () => {
    toast.success('所有设备同步完成');
  };

  const handleExport = () => {
    toast.success('流水数据导出成功');
  };

  const filteredMachines = vendingMachines.filter(machine => {
    const matchKeyword = !searchKeyword || machine.name.includes(searchKeyword) || machine.location.includes(searchKeyword);
    const matchStatus = selectedStatus === 'all' || machine.status === selectedStatus;
    return matchKeyword && matchStatus;
  });

  const onlineCount = vendingMachines.filter(m => m.status === 'online').length;
  const errorCount = vendingMachines.filter(m => m.status === 'error').length;
  const totalItems = vendingMachines.reduce((sum, m) => sum + m.items, 0);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">无人售货柜库存联动</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索售货柜"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出流水
          </button>
          <button onClick={handleSyncAll} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> 全部同步
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">售货柜总数</p>
              <p className="text-xl font-bold text-gray-900">{vendingMachines.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">在线设备</p>
              <p className="text-xl font-bold text-green-600">{onlineCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">异常设备</p>
              <p className="text-xl font-bold text-red-600">{errorCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">库存商品数</p>
              <p className="text-xl font-bold text-purple-600">{totalItems}</p>
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
            <option value="online">在线</option>
            <option value="offline">离线</option>
            <option value="error">异常</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">售货柜列表</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredMachines.map(machine => (
              <div key={machine.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      machine.status === 'online' ? 'bg-green-100' :
                      machine.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Package className={`w-5 h-5 ${
                        machine.status === 'online' ? 'text-green-600' :
                        machine.status === 'error' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{machine.name}</p>
                      <p className="text-sm text-gray-500">{machine.location} - {machine.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">库存商品</p>
                      <p className="font-medium text-gray-900">{machine.items} 件</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      machine.status === 'online' ? 'bg-green-100 text-green-800' :
                      machine.status === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {machine.status === 'online' ? '在线' :
                       machine.status === 'error' ? '异常' : '离线'}
                    </span>
                    <button
                      onClick={() => handleSync(machine.id)}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg flex items-center gap-1"
                    >
                      <RefreshCw className="w-4 h-4" /> 同步
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">最后同步: {machine.lastSync}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">实时销售流水</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {salesRecords.map(record => (
              <div key={record.id} className="px-6 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{record.product}</span>
                  <span className="text-sm text-red-600">-{record.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{record.machine}</span>
                  <span className="text-xs text-gray-400">{record.time.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">流水笔数</span>
              <span className="font-medium">{salesRecords.length} 笔</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">销售额</span>
              <span className="font-bold text-red-600">¥{salesRecords.reduce((s, r) => s + r.amount, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-4">进销存数据比对</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">售货柜</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">系统库存</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">实际库存</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">差异</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">同步状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vendingMachines.map(machine => {
                const actualQty = machine.items + Math.floor(Math.random() * 10) - 5;
                const difference = actualQty - machine.items;
                return (
                  <tr key={machine.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{machine.name}</td>
                    <td className="px-4 py-3 text-sm text-center">{machine.items}</td>
                    <td className="px-4 py-3 text-sm text-center">{actualQty}</td>
                    <td className={`px-4 py-3 text-sm text-center font-medium ${
                      difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {difference > 0 ? '+' : ''}{difference}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        machine.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {machine.status === 'online' ? '已同步' : '待同步'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}