import React, { useState } from 'react';
import { toast } from '../../components/ui/Toast';
import { ShoppingBag, Store, Smartphone, Package, Search, Download } from 'lucide-react';

const terminals = [
  { id: 'counter', name: '服务台', icon: Store },
  { id: 'bracelet', name: '手环消费', icon: Smartphone },
  { id: 'vending', name: '无人售货柜', icon: Package },
];

export default function AdminSales() {
  const [salesRecords, setSalesRecords] = useState([
    { id: 'SO001', terminal: '服务台', product: '矿泉水', quantity: 5, amount: 10.00, time: '2024-06-15 14:30:00', type: 'counter' },
    { id: 'SO002', terminal: '手环消费', product: '可乐', quantity: 2, amount: 7.00, time: '2024-06-15 14:25:00', type: 'bracelet' },
    { id: 'SO003', terminal: '无人售货柜', product: '薯片', quantity: 1, amount: 8.00, time: '2024-06-15 14:20:00', type: 'vending' },
    { id: 'SO004', terminal: '服务台', product: '羽毛球拍', quantity: 1, amount: 120.00, time: '2024-06-15 14:15:00', type: 'counter' },
    { id: 'SO005', terminal: '手环消费', product: '矿泉水', quantity: 3, amount: 6.00, time: '2024-06-15 14:10:00', type: 'bracelet' },
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('all');

  const filteredRecords = salesRecords.filter(record => {
    const matchKeyword = !searchKeyword || record.product.includes(searchKeyword) || record.id.includes(searchKeyword);
    const matchTerminal = selectedTerminal === 'all' || record.type === selectedTerminal;
    return matchKeyword && matchTerminal;
  });

  const handleExport = () => {
    toast.success('销售出库记录导出成功');
  };

  const totalAmount = salesRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalQuantity = salesRecords.reduce((sum, record) => sum + record.quantity, 0);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">销售出库管理</h2>
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
          <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日出库总额</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">¥{totalAmount.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日出库数量</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalQuantity} 件</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">销售终端数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{terminals.length} 个</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">终端筛选：</span>
          <select
            value={selectedTerminal}
            onChange={(e) => setSelectedTerminal(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">全部终端</option>
            {terminals.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">出库单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">销售终端</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">金额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.terminal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">¥{record.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-4">终端库存实时状态</h3>
        <div className="grid grid-cols-3 gap-4">
          {terminals.map(terminal => {
            const Icon = terminal.icon;
            return (
              <div key={terminal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{terminal.name}</p>
                    <p className="text-xs text-gray-500">在线</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">库存同步状态</span>
                    <span className="text-green-600">实时同步中</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">今日出库</span>
                    <span className="font-medium">¥{salesRecords.filter(r => r.type === terminal.id).reduce((s, r) => s + r.amount, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}