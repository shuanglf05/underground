import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import { Building2, FileText, DollarSign, Plus, MapPin, Square, Calendar, AlertCircle, X, Check } from 'lucide-react';
import { useState } from 'react';
import type { Asset } from '../../types';

export default function AdminAssets() {
  const { assets, contracts, bills, fetchAssets, fetchBills } = useStore();
  const [activeTab, setActiveTab] = useState('assets');
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBillDetailModal, setShowBillDetailModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<typeof bills[0] | null>(null);
  const [message, setMessage] = useState('');
  const [newAsset, setNewAsset] = useState({
    name: '',
    code: '',
    floor: '',
    area: 0,
    status: 'available' as const,
  });

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      available: { bg: 'bg-green-100', text: 'text-green-600', label: '可租' },
      rented: { bg: 'bg-blue-100', text: 'text-blue-600', label: '已租' },
      maintenance: { bg: 'bg-orange-100', text: 'text-orange-600', label: '维护中' },
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  };

  const getContractStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-100', text: 'text-green-600', label: '进行中' },
      expired: { bg: 'bg-gray-100', text: 'text-gray-600', label: '已到期' },
      terminated: { bg: 'bg-red-100', text: 'text-red-600', label: '已终止' },
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  };

  const getBillStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-600', label: '待支付' },
      paid: { bg: 'bg-green-100', text: 'text-green-600', label: '已支付' },
      overdue: { bg: 'bg-red-100', text: 'text-red-600', label: '已逾期' },
    };
    return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  };

  const getBillTypeName = (type: string) => {
    const names: Record<string, string> = { rent: '租金', property: '物业费', utility: '水电费' };
    return names[type] || type;
  };

  const handleAddAsset = async () => {
    const res = await fetch('/api/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAsset),
    });
    const data = await res.json();
    if (data.success) {
      await fetchAssets();
      setShowAddModal(false);
      setNewAsset({ name: '', code: '', floor: '', area: 0, status: 'available' });
      setMessage('资产添加成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('添加失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleViewBillDetail = (bill: typeof bills[0]) => {
    setSelectedBill(bill);
    setShowBillDetailModal(true);
  };

  const handleConfirmPayment = async (bill: typeof bills[0]) => {
    const res = await fetch(`/api/assets/bills/${bill.id}/pay`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      await fetchBills();
      setMessage('收款成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('收款失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const stats = {
    total: assets.length,
    available: assets.filter((a) => a.status === 'available').length,
    rented: assets.filter((a) => a.status === 'rented').length,
    totalArea: assets.reduce((sum, a) => sum + a.area, 0),
    activeContracts: contracts.filter((c) => c.status === 'active').length,
    pendingBills: bills.filter((b) => b.status === 'pending').length,
    overdueBills: bills.filter((b) => b.status === 'overdue').length,
  };

  const selectedAssetContracts = selectedAssetId
    ? contracts.filter((c) => c.assetId === selectedAssetId)
    : contracts;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">资产管理</h1>
            <p className="text-sm text-gray-500">商铺租赁与合同管理</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            添加资产
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-500">资产总数</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">进行中合同</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.activeContracts}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-500">待收账单</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingBills}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-500">逾期账单</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.overdueBills}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setActiveTab('assets'); setSelectedAssetId(null); }}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'assets' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              资产台账
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'contracts' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              租赁合同
            </button>
            <button
              onClick={() => setActiveTab('bills')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'bills' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              账单管理
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'assets' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => {
                  const badge = getStatusBadge(asset.status);
                  return (
                    <div
                      key={asset.id}
                      onClick={() => { setSelectedAssetId(asset.id); setActiveTab('contracts'); }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                        selectedAssetId === asset.id ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-primary-400" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-800">{asset.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{asset.code}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {asset.floor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            {asset.area}㎡
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm text-gray-500">
                      <th className="px-4 py-3 font-medium">合同编号</th>
                      <th className="px-4 py-3 font-medium">资产</th>
                      <th className="px-4 py-3 font-medium">租户</th>
                      <th className="px-4 py-3 font-medium">租金</th>
                      <th className="px-4 py-3 font-medium">期限</th>
                      <th className="px-4 py-3 font-medium">状态</th>
                      <th className="px-4 py-3 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAssetContracts.map((contract) => {
                      const badge = getContractStatusBadge(contract.status);
                      return (
                        <tr key={contract.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">CT{String(contract.id).padStart(4, '0')}</td>
                          <td className="px-4 py-3 text-sm">{contract.assetName}</td>
                          <td className="px-4 py-3 text-sm">{contract.tenantName}</td>
                          <td className="px-4 py-3 font-medium text-accent-600">¥{contract.rent}/月</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {contract.startDate} ~ {contract.endDate}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => { setActiveTab('bills'); }}
                              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
                            >
                              查看账单
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {selectedAssetContracts.length === 0 && (
                  <p className="text-center text-gray-400 py-8">暂无合同数据</p>
                )}
              </div>
            )}

            {activeTab === 'bills' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm text-gray-500">
                      <th className="px-4 py-3 font-medium">账单编号</th>
                      <th className="px-4 py-3 font-medium">合同</th>
                      <th className="px-4 py-3 font-medium">类型</th>
                      <th className="px-4 py-3 font-medium">金额</th>
                      <th className="px-4 py-3 font-medium">到期日</th>
                      <th className="px-4 py-3 font-medium">状态</th>
                      <th className="px-4 py-3 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill) => {
                      const badge = getBillStatusBadge(bill.status);
                      const contract = contracts.find((c) => c.id === bill.contractId);
                      return (
                        <tr key={bill.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">BILL{String(bill.id).padStart(4, '0')}</td>
                          <td className="px-4 py-3 text-sm">{contract?.tenantName || '-'}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {getBillTypeName(bill.type)}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-accent-600">¥{bill.amount}</td>
                          <td className="px-4 py-3 text-sm">{bill.dueDate}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {bill.status !== 'paid' && (
                                <button
                                  onClick={() => handleConfirmPayment(bill)}
                                  className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                                >
                                  确认收款
                                </button>
                              )}
                              <button
                                onClick={() => handleViewBillDetail(bill)}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600"
                              >
                                详情
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">添加资产</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资产名称</label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入资产名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资产编号</label>
                <input
                  type="text"
                  value={newAsset.code}
                  onChange={(e) => setNewAsset({ ...newAsset, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入资产编号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">楼层</label>
                <input
                  type="text"
                  value={newAsset.floor}
                  onChange={(e) => setNewAsset({ ...newAsset, floor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入楼层"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">面积（㎡）</label>
                <input
                  type="number"
                  value={newAsset.area}
                  onChange={(e) => setNewAsset({ ...newAsset, area: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入面积"
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
                onClick={handleAddAsset}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Detail Modal */}
      {showBillDetailModal && selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">账单详情</h2>
              <button onClick={() => { setShowBillDetailModal(false); setSelectedBill(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">账单编号</p>
                <p className="font-medium text-gray-800 font-mono">BILL{String(selectedBill.id).padStart(4, '0')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">账单类型</p>
                  <p className="font-medium">{getBillTypeName(selectedBill.type)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">金额</p>
                  <p className="font-medium text-accent-600">¥{selectedBill.amount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">到期日期</p>
                  <p className="font-medium">{selectedBill.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">状态</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getBillStatusBadge(selectedBill.status).bg} ${getBillStatusBadge(selectedBill.status).text}`}>
                    {getBillStatusBadge(selectedBill.status).label}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">合同信息</p>
                <p className="font-medium">{contracts.find(c => c.id === selectedBill.contractId)?.tenantName || '-'}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowBillDetailModal(false); setSelectedBill(null); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                关闭
              </button>
              {selectedBill.status !== 'paid' && (
                <button
                  onClick={() => { handleConfirmPayment(selectedBill); setShowBillDetailModal(false); setSelectedBill(null); }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  确认收款
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
