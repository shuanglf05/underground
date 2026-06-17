import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Plus, Edit, Trash2, Search, Wallet, CreditCard, BarChart3, Clock } from 'lucide-react';

export default function AdminCashier() {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const activeTab = type || 'main';

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const paymentChannels = [
    { id: '1', name: '微信支付', rate: 0.6, status: 'active', description: '微信扫码支付' },
    { id: '2', name: '支付宝', rate: 0.6, status: 'active', description: '支付宝扫码支付' },
    { id: '3', name: '会员卡', rate: 0, status: 'active', description: '会员余额支付' },
    { id: '4', name: '现金', rate: 0, status: 'active', description: '现金支付' },
  ];

  const braceletRecords = [
    { id: 'B001', rfid: 'RFID001', holder: '张三', balance: 150, deposit: 200, status: 'active', createTime: '2024-01-15 10:30' },
    { id: 'B002', rfid: 'RFID002', holder: '李四', balance: 80, deposit: 200, status: 'active', createTime: '2024-01-15 11:00' },
    { id: 'B003', rfid: 'RFID003', holder: '王五', balance: 0, deposit: 0, status: 'returned', createTime: '2024-01-14 15:00' },
  ];

  const depositRules = [
    { id: '1', name: '标准押金', amount: 200, applyTo: '普通手环', status: 'active' },
    { id: '2', name: 'VIP押金', amount: 500, applyTo: 'VIP手环', status: 'active' },
    { id: '3', name: '儿童手环押金', amount: 100, applyTo: '儿童手环', status: 'active' },
  ];

  const dailySettlement = [
    { date: '2024-01-15', totalAmount: 15680, wechatAmount: 8500, alipayAmount: 4200, cashAmount: 1800, memberAmount: 1180, orderCount: 86 },
    { date: '2024-01-14', totalAmount: 12350, wechatAmount: 6800, alipayAmount: 3500, cashAmount: 1200, memberAmount: 850, orderCount: 72 },
    { date: '2024-01-13', totalAmount: 18920, wechatAmount: 10200, alipayAmount: 5100, cashAmount: 2400, memberAmount: 1220, orderCount: 98 },
  ];

  const tabs = [
    { id: 'main', label: '收银主流程' },
    { id: 'bracelet', label: '手环预存' },
    { id: 'deposit', label: '押金管理' },
    { id: 'settlement', label: '日结对账' },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">收银管理</h2>
          <div className="flex gap-2 mt-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(`/admin/cashier/${tab.id}`)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {(activeTab === 'main' || activeTab === 'deposit') && (
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新增配置
          </Button>
        )}
      </div>

      {activeTab === 'main' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">支付渠道配置</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">渠道名称</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">费率(%)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">描述</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {paymentChannels.map((channel) => (
                  <tr key={channel.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{channel.name}</td>
                    <td className="py-3 px-4">{channel.rate}%</td>
                    <td className="py-3 px-4">
                      {channel.status === 'active' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">启用</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">停用</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{channel.description}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bracelet' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">手环预存记录</h3>
            <div className="flex gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索手环编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">手环编号</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">RFID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">持有人</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">余额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">押金</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">创建时间</th>
                </tr>
              </thead>
              <tbody>
                {braceletRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{record.id}</td>
                    <td className="py-3 px-4">{record.rfid}</td>
                    <td className="py-3 px-4">{record.holder}</td>
                    <td className="py-3 px-4 font-medium text-green-600">¥{record.balance}</td>
                    <td className="py-3 px-4">¥{record.deposit}</td>
                    <td className="py-3 px-4">
                      {record.status === 'active' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">使用中</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">已退还</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{record.createTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deposit' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">押金规则配置</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">规则名称</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">押金金额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">适用对象</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {depositRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{rule.name}</td>
                    <td className="py-3 px-4 font-medium">¥{rule.amount}</td>
                    <td className="py-3 px-4">{rule.applyTo}</td>
                    <td className="py-3 px-4">
                      {rule.status === 'active' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">启用</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">停用</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settlement' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">日结对账</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">日期</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">订单数</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">微信支付</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">支付宝</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">现金</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">会员卡</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">合计</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {dailySettlement.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.date}</td>
                    <td className="py-3 px-4">{item.orderCount}</td>
                    <td className="py-3 px-4">¥{item.wechatAmount}</td>
                    <td className="py-3 px-4">¥{item.alipayAmount}</td>
                    <td className="py-3 px-4">¥{item.cashAmount}</td>
                    <td className="py-3 px-4">¥{item.memberAmount}</td>
                    <td className="py-3 px-4 font-bold text-red-600">¥{item.totalAmount}</td>
                    <td className="py-3 px-4">
                      <Button size="sm">查看详情</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={activeTab === 'main' ? '新增支付渠道' : '新增押金规则'}
      >
        <div className="space-y-4">
          {activeTab === 'main' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">渠道名称</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">费率(%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">规则名称</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">押金金额</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">适用对象</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <div className="flex gap-2">
            <Button onClick={() => setShowAddModal(false)} variant="outline">取消</Button>
            <Button onClick={() => { toast.success('添加成功'); setShowAddModal(false); }}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}