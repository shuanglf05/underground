import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Bell, Plus, AlertTriangle, ShoppingCart, Search, Download } from 'lucide-react';

export default function AdminReplenish() {
  const [products, setProducts] = useState([
    { id: '1', name: '矿泉水', sku: 'P001', currentQty: 50, minQty: 100, maxQty: 500, unit: '瓶', status: 'warning' },
    { id: '2', name: '可乐', sku: 'P002', currentQty: 80, minQty: 100, maxQty: 300, unit: '瓶', status: 'warning' },
    { id: '3', name: '薯片', sku: 'P003', currentQty: 200, minQty: 150, maxQty: 300, unit: '袋', status: 'normal' },
    { id: '4', name: '羽毛球拍', sku: 'P004', currentQty: 45, minQty: 50, maxQty: 100, unit: '副', status: 'danger' },
    { id: '5', name: 'VR眼镜', sku: 'P005', currentQty: 10, minQty: 8, maxQty: 20, unit: '台', status: 'normal' },
    { id: '6', name: '零食礼包', sku: 'P006', currentQty: 30, minQty: 50, maxQty: 200, unit: '盒', status: 'danger' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    toast.success('补货通知已发送');
    setShowModal(false);
  };

  const handleCreateOrder = () => {
    toast.success('采购订单已创建');
  };

  const filteredProducts = products.filter(product => {
    const matchKeyword = !searchKeyword || product.name.includes(searchKeyword) || product.sku.includes(searchKeyword);
    const matchStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchKeyword && matchStatus;
  });

  const warningCount = products.filter(p => p.status === 'warning').length;
  const dangerCount = products.filter(p => p.status === 'danger').length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">补货预警管理</h2>
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
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> 新建预警规则
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">低库存预警</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">紧缺商品</p>
              <p className="text-2xl font-bold text-red-600">{dangerCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">需补货商品</p>
              <p className="text-2xl font-bold text-gray-900">{warningCount + dangerCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
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
            <option value="danger">紧缺</option>
            <option value="warning">低库存</option>
            <option value="normal">正常</option>
          </select>
          <button onClick={handleCreateOrder} className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> 一键生成采购订单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品编码</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">当前库存</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">安全库存</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">上限库存</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">建议补货量</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`font-medium ${
                    product.status === 'danger' ? 'text-red-600' :
                    product.status === 'warning' ? 'text-yellow-600' : 'text-gray-900'
                  }`}>
                    {product.currentQty} {product.unit}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.minQty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.maxQty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'danger' ? 'bg-red-100 text-red-800' :
                    product.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {product.status === 'danger' ? '紧缺' :
                     product.status === 'warning' ? '低库存' : '正常'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-medium text-blue-600">
                    {Math.max(product.minQty - product.currentQty, 0)} {product.unit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-4">库存预警设置</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">预警通知方式</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>系统消息</option>
                <option>邮件通知</option>
                <option>短信通知</option>
                <option>全部</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">预警频率</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>实时</option>
                <option>每小时</option>
                <option>每天</option>
                <option>每周</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">预警阈值</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">保存设置</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="新建预警规则"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>请选择商品</option>
              <option>矿泉水</option>
              <option>可乐</option>
              <option>薯片</option>
              <option>羽毛球拍</option>
              <option>VR眼镜</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">安全库存下限</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="最低库存"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">库存上限</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="最高库存"
              />
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