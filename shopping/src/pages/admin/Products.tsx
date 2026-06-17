import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Package, Plus, Edit, Trash2, Search, Upload, ChevronDown, Check, X } from 'lucide-react';

const categories = ['食品饮料', '日用品', '玩具', '运动器材', '电子产品', '服饰'];
const statusOptions = [
  { value: 'active', label: '上架' },
  { value: 'inactive', label: '下架' }
];

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: '1', code: 'P001', name: '矿泉水', brand: '怡宝', unit: '瓶', price: 2.00, cost: 1.50, category: '食品饮料', supplier: '怡宝供应商', status: 'active' },
    { id: '2', code: 'P002', name: '可乐', brand: '可口可乐', unit: '瓶', price: 3.50, cost: 2.50, category: '食品饮料', supplier: '可口可乐供应商', status: 'active' },
    { id: '3', code: 'P003', name: '薯片', brand: '乐事', unit: '袋', price: 8.00, cost: 5.00, category: '食品饮料', supplier: '百事供应商', status: 'active' },
    { id: '4', code: 'P004', name: '羽毛球拍', brand: '李宁', unit: '副', price: 120.00, cost: 80.00, category: '运动器材', supplier: '李宁供应商', status: 'active' },
    { id: '5', code: 'P005', name: 'VR眼镜', brand: 'HTC', unit: '台', price: 2999.00, cost: 2000.00, category: '电子产品', supplier: 'HTC供应商', status: 'inactive' },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该商品吗？')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('删除成功');
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } : p));
      toast.success('更新成功');
    } else {
      const newProduct = {
        ...editingProduct,
        id: String(Date.now()),
        code: `P${String(products.length + 1).padStart(3, '0')}`
      };
      setProducts([...products, newProduct]);
      toast.success('创建成功');
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchKeyword = !searchKeyword || p.name.includes(searchKeyword) || p.code.includes(searchKeyword);
    const matchCategory = !filterCategory || p.category === filterCategory;
    return matchKeyword && matchCategory;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">商品档案管理</h2>
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
            <Plus className="w-4 h-4" /> 新增商品
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">分类筛选：</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">全部</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品编码</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">商品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">品牌</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">零售价</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">成本价</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">供应商</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">¥{product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥{product.cost.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {product.status === 'active' ? '上架' : '下架'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(product)} className="p-1 hover:bg-gray-100 rounded" title="编辑">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-1 hover:bg-gray-100 rounded" title="删除">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? '编辑商品' : '新增商品'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品编码</label>
              <input
                type="text"
                value={editingProduct?.code || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="自动生成"
                disabled={!!editingProduct}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
              <input
                type="text"
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入商品名称"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">品牌</label>
              <input
                type="text"
                value={editingProduct?.brand || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="品牌名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
              <input
                type="text"
                value={editingProduct?.unit || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="瓶/袋/台等"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <select
                value={editingProduct?.category || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择分类</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">零售价</label>
              <input
                type="number"
                step="0.01"
                value={editingProduct?.price || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">成本价</label>
              <input
                type="number"
                step="0.01"
                value={editingProduct?.cost || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, cost: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">供应商</label>
            <input
              type="text"
              value={editingProduct?.supplier || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="供应商名称"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品图片</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">点击或拖拽上传图片</p>
              <button className="mt-2 px-4 py-1 text-sm text-blue-600 hover:text-blue-700">选择文件</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
            <div className="flex gap-4">
              {statusOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={editingProduct?.status === opt.value || (!editingProduct && opt.value === 'active')}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
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