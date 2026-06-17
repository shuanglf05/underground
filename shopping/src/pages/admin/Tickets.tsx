import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Plus, Edit, Trash2, Search, Ticket, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminTickets() {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const activeTab = type || 'types';

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);

  const ticketTypes = [
    { id: '1', name: '单人日场票', type: 'single', price: 128, validDays: 1, status: 'active', description: '单人全天入场门票' },
    { id: '2', name: '单人夜场票', type: 'single', price: 88, validDays: 1, status: 'active', description: '单人夜间入场门票(18:00-22:00)' },
    { id: '3', name: '家庭套票', type: 'package', price: 298, validDays: 1, status: 'active', description: '2大1小家庭套票' },
    { id: '4', name: '双人情侣票', type: 'package', price: 218, validDays: 1, status: 'active', description: '双人入场门票' },
    { id: '5', name: '年卡会员', type: 'membership', price: 998, validDays: 365, status: 'active', description: '全年无限次入场' },
    { id: '6', name: '季卡会员', type: 'membership', price: 398, validDays: 90, status: 'inactive', description: '季度无限次入场' },
  ];

  const salesRecords = [
    { id: 'S001', ticketName: '单人日场票', quantity: 2, amount: 256, customer: '138****8888', time: '2024-01-15 10:30', channel: '服务台' },
    { id: 'S002', ticketName: '家庭套票', quantity: 1, amount: 298, customer: '139****9999', time: '2024-01-15 11:20', channel: '微信小程序' },
    { id: 'S003', ticketName: '双人情侣票', quantity: 1, amount: 218, customer: '137****7777', time: '2024-01-15 14:15', channel: '美团' },
    { id: 'S004', ticketName: '年卡会员', quantity: 1, amount: 998, customer: '136****6666', time: '2024-01-15 15:30', channel: '服务台' },
  ];

  const verifyRecords = [
    { id: 'V001', ticketName: '单人日场票', customer: '138****8888', verifyTime: '2024-01-15 10:35', status: 'success', gate: 'A1闸机' },
    { id: 'V002', ticketName: '家庭套票', customer: '139****9999', verifyTime: '2024-01-15 11:25', status: 'success', gate: 'A2闸机' },
    { id: 'V003', ticketName: '双人情侣票', customer: '137****7777', verifyTime: '2024-01-15 14:20', status: 'success', gate: 'B1闸机' },
    { id: 'V004', ticketName: '单人日场票', customer: '135****5555', verifyTime: '2024-01-15 16:00', status: 'failed', gate: 'A1闸机', reason: '门票已过期' },
  ];

  const refundRecords = [
    { id: 'R001', orderId: 'ORD20240115001', ticketName: '单人日场票', amount: 128, refundAmount: 115.2, customer: '138****8888', time: '2024-01-15 12:00', status: 'completed', reason: '行程变更' },
    { id: 'R002', orderId: 'ORD20240115002', ticketName: '家庭套票', amount: 298, refundAmount: 298, customer: '139****9999', time: '2024-01-15 13:30', status: 'pending', reason: '天气原因' },
  ];

  const filteredTypes = ticketTypes.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    toast.success(editingItem ? '修改成功' : '添加成功');
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    toast.success('删除成功');
  };

  const tabs = [
    { id: 'types', label: '票种管理' },
    { id: 'sales', label: '门票销售' },
    { id: 'verify', label: '门票验证' },
    { id: 'refund', label: '退票管理' },
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 mb-4">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(`/admin/tickets/${tab.id}`)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'types' && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              新增票种
            </Button>
          )}
        </div>
      </div>

      {activeTab === 'types' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索票种名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种名称</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">类型</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">价格</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">有效期</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{ticket.name}</p>
                      <p className="text-xs text-gray-500">{ticket.description}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        ticket.type === 'single' ? 'bg-blue-100 text-blue-800' :
                        ticket.type === 'package' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {ticket.type === 'single' ? '单票' : ticket.type === 'package' ? '套餐' : '会员'}
                      </span>
                    </td>
                    <td className="py-3 px-4">¥{ticket.price}</td>
                    <td className="py-3 px-4">{ticket.validDays}天</td>
                    <td className="py-3 px-4">
                      {ticket.status === 'active' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> 启用
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-400">
                          <XCircle className="w-4 h-4 mr-1" /> 停用
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => { setEditingItem(ticket); setShowAddModal(true); }}
                        className="text-blue-600 hover:text-blue-700 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="text-red-600 hover:text-red-700"
                      >
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

      {activeTab === 'sales' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">销售单号</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">数量</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">金额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">客户</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">渠道</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">时间</th>
                </tr>
              </thead>
              <tbody>
                {salesRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{record.id}</td>
                    <td className="py-3 px-4">{record.ticketName}</td>
                    <td className="py-3 px-4">{record.quantity}</td>
                    <td className="py-3 px-4 font-medium">¥{record.amount}</td>
                    <td className="py-3 px-4">{record.customer}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{record.channel}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{record.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'verify' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">验证单号</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">客户</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">闸机</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">时间</th>
                </tr>
              </thead>
              <tbody>
                {verifyRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{record.id}</td>
                    <td className="py-3 px-4">{record.ticketName}</td>
                    <td className="py-3 px-4">{record.customer}</td>
                    <td className="py-3 px-4">{record.gate}</td>
                    <td className="py-3 px-4">
                      {record.status === 'success' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> 通过
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-4 h-4 mr-1" /> 失败
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{record.verifyTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'refund' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">退款单号</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">订单号</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">原金额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">退款金额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">时间</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {refundRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{record.id}</td>
                    <td className="py-3 px-4">{record.orderId}</td>
                    <td className="py-3 px-4">{record.ticketName}</td>
                    <td className="py-3 px-4">¥{record.amount}</td>
                    <td className="py-3 px-4 font-medium text-red-600">¥{record.refundAmount}</td>
                    <td className="py-3 px-4">
                      {record.status === 'completed' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> 已完成
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-600">
                          <Clock className="w-4 h-4 mr-1" /> 处理中
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{record.time}</td>
                    <td className="py-3 px-4">
                      {record.status === 'pending' && (
                        <Button size="sm" onClick={() => toast.success('退款已批准')}>
                          批准退款
                        </Button>
                      )}
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
        onClose={() => { setShowAddModal(false); setEditingItem(null); }}
        title={editingItem ? '修改票种' : '新增票种'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">票种名称</label>
            <input
              type="text"
              defaultValue={editingItem?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="single">单票</option>
              <option value="package">套餐</option>
              <option value="membership">会员</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
            <input
              type="number"
              defaultValue={editingItem?.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">有效期（天）</label>
            <input
              type="number"
              defaultValue={editingItem?.validDays}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea
              defaultValue={editingItem?.description}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setShowAddModal(false); setEditingItem(null); }} variant="outline">取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}