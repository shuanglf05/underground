import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { ShoppingCart, Plus, Edit, Check, X, Download, FileText, Search } from 'lucide-react';

const suppliers = ['怡宝供应商', '可口可乐供应商', '百事供应商', '李宁供应商', 'HTC供应商'];
const warehouses = ['总仓库', '吧台区', '泳池区', 'VR体验区'];

export default function AdminPurchase() {
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 'PO001', supplier: '怡宝供应商', date: '2024-06-15', status: 'completed', items: [] },
    { id: 'PO002', supplier: '李宁供应商', date: '2024-06-14', status: 'pending', items: [] },
    { id: 'PO003', supplier: '百事供应商', date: '2024-06-13', status: 'received', items: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleAdd = () => {
    setEditingOrder(null);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingOrder) {
      setPurchaseOrders(purchaseOrders.map(p => p.id === editingOrder.id ? { ...p, ...editingOrder } : p));
      toast.success('更新成功');
    } else {
      const newOrder = {
        ...editingOrder,
        id: `PO${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        status: 'pending'
      };
      setPurchaseOrders([...purchaseOrders, newOrder]);
      toast.success('创建成功');
    }
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleReceive = (id: string) => {
    setPurchaseOrders(purchaseOrders.map(p => 
      p.id === id ? { ...p, status: 'received' } : p
    ));
    toast.success('入库验收完成');
  };

  const handleExport = () => {
    toast.success('入库单导出成功');
  };

  const filteredOrders = purchaseOrders.filter(p => 
    p.id.includes(searchKeyword) || p.supplier.includes(searchKeyword)
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">采购入库管理</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索采购单"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出
          </button>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> 新建采购单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">采购单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">供应商</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">创建日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'completed' ? '已完成' :
                     order.status === 'received' ? '已收货' : '待收货'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleReceive(order.id)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        入库验收
                      </button>
                    )}
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                      查看详情
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">库存区域分布</h3>
          <div className="space-y-3">
            {warehouses.map(wh => (
              <div key={wh} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{wh}</span>
                <span className="text-sm font-medium text-gray-900">{Math.floor(Math.random() * 500) + 100} 件</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">待处理采购单</h3>
          <div className="space-y-2">
            {purchaseOrders.filter(p => p.status === 'pending').map(order => (
              <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{order.id}</span>
                <span className="text-xs text-yellow-600">待收货</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">供应商管理</h3>
          <div className="space-y-2">
            {suppliers.slice(0, 4).map(sup => (
              <div key={sup} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{sup}</span>
                <button className="text-xs text-blue-600 hover:underline">编辑</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingOrder ? '编辑采购单' : '新建采购单'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">采购单号</label>
              <input
                type="text"
                value={editingOrder?.id || ''}
                onChange={(e) => setEditingOrder({ ...editingOrder, id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="自动生成"
                disabled={!!editingOrder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">供应商</label>
              <select
                value={editingOrder?.supplier || ''}
                onChange={(e) => setEditingOrder({ ...editingOrder, supplier: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择供应商</option>
                {suppliers.map(sup => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">采购商品</label>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <select className="px-3 py-2 border border-gray-300 rounded">
                  <option>选择商品</option>
                  <option>矿泉水</option>
                  <option>可乐</option>
                  <option>薯片</option>
                </select>
                <input type="number" placeholder="数量" className="px-3 py-2 border border-gray-300 rounded" />
                <input type="number" placeholder="单价" className="px-3 py-2 border border-gray-300 rounded" />
                <button className="px-3 py-2 bg-blue-600 text-white rounded">添加</button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm">矿泉水 x 100</span>
                  <span className="text-sm">¥150.00</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm">可乐 x 50</span>
                  <span className="text-sm">¥125.00</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium">合计</span>
                <span className="text-lg font-bold">¥275.00</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">入库仓库</label>
            <div className="flex flex-wrap gap-2">
              {warehouses.map(wh => (
                <label key={wh} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="warehouse" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{wh}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">保存</button>
          </div>
        </div>
      </Modal>
    </>
  );
}