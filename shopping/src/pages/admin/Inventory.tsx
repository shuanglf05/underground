import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { ClipboardList, Plus, Scan, Download, Check, AlertTriangle } from 'lucide-react';

export default function AdminInventory() {
  const [plans, setPlans] = useState([
    { id: 'PI001', name: '2024年6月盘点计划', date: '2024-06-15', status: 'completed', warehouse: '总仓库' },
    { id: 'PI002', name: '2024年6月盘点计划', date: '2024-06-14', status: 'completed', warehouse: '吧台区' },
    { id: 'PI003', name: '2024年6月盘点计划', date: '2024-06-13', status: 'pending', warehouse: '泳池区' },
  ]);

  const [inventoryItems, setInventoryItems] = useState([
    { id: '1', product: '矿泉水', sku: 'P001', systemQty: 500, actualQty: 498, difference: -2, reason: '损耗' },
    { id: '2', product: '可乐', sku: 'P002', systemQty: 300, actualQty: 300, difference: 0, reason: '' },
    { id: '3', product: '薯片', sku: 'P003', systemQty: 200, actualQty: 205, difference: 5, reason: '赠品未入账' },
    { id: '4', product: '羽毛球拍', sku: 'P004', systemQty: 50, actualQty: 48, difference: -2, reason: '报损' },
    { id: '5', product: 'VR眼镜', sku: 'P005', systemQty: 10, actualQty: 10, difference: 0, reason: '' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleCreatePlan = () => {
    setShowModal(true);
  };

  const handleSavePlan = () => {
    toast.success('盘点计划创建成功');
    setShowModal(false);
  };

  const handleScan = () => {
    toast.info('请扫描商品条码...');
  };

  const handleExport = () => {
    toast.success('盘点差异汇总表导出成功');
  };

  const filteredItems = inventoryItems.filter(item => 
    item.product.includes(searchKeyword) || item.sku.includes(searchKeyword)
  );

  const totalDifference = inventoryItems.reduce((sum, item) => sum + item.difference, 0);
  const profitItems = inventoryItems.filter(item => item.difference > 0).length;
  const lossItems = inventoryItems.filter(item => item.difference < 0).length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">库存盘点管理</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索商品"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出汇总表
          </button>
          <button onClick={handleCreatePlan} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> 新建盘点计划
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">盘点计划</p>
              <p className="text-xl font-bold text-gray-900">{plans.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">盘盈商品</p>
              <p className="text-xl font-bold text-green-600">+{profitItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">盘亏商品</p>
              <p className="text-xl font-bold text-red-600">-{lossItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Scan className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">差异总计</p>
              <p className={`text-xl font-bold ${totalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalDifference >= 0 ? '+' : ''}{totalDifference}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">盘点计划列表</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {plans.map(plan => (
              <div key={plan.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{plan.name}</p>
                  <p className="text-sm text-gray-500">{plan.warehouse} - {plan.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  plan.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {plan.status === 'completed' ? '已完成' : '进行中'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">盘点结果明细</h3>
            <button onClick={handleScan} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg flex items-center gap-1">
              <Scan className="w-4 h-4" /> 扫码录入
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => (
              <div key={item.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.product}</span>
                  <span className="text-sm text-gray-500">{item.sku}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>系统: <span className="font-medium">{item.systemQty}</span></span>
                  <span>实盘: <span className="font-medium">{item.actualQty}</span></span>
                  <span className={`font-medium ${item.difference > 0 ? 'text-green-600' : item.difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.difference > 0 ? '+' : ''}{item.difference}
                  </span>
                </div>
                {item.reason && (
                  <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-4">盘点差异汇总</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">商品名称</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">商品编码</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">系统数量</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">实盘数量</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">差异</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">差异原因</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventoryItems.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.sku}</td>
                  <td className="px-4 py-3 text-sm text-center">{item.systemQty}</td>
                  <td className="px-4 py-3 text-sm text-center">{item.actualQty}</td>
                  <td className={`px-4 py-3 text-sm text-center font-medium ${item.difference > 0 ? 'text-green-600' : item.difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.difference > 0 ? '+' : ''}{item.difference}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.reason || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="新建盘点计划"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">计划名称</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入计划名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">盘点仓库</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>总仓库</option>
              <option>吧台区</option>
              <option>泳池区</option>
              <option>VR体验区</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">盘点日期</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
            <button onClick={handleSavePlan} className="px-4 py-2 bg-blue-600 text-white rounded-lg">创建</button>
          </div>
        </div>
      </Modal>
    </>
  );
}