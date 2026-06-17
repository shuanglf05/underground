import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Ticket, Users, Building2, BarChart3, FileText } from 'lucide-react';
import { EmptyState } from '../../components/ui/EmptyState';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: '今日营收', value: '¥52,800', change: '+15%', color: 'text-green-600' },
    { label: '今日客流', value: '320人', change: '+8%', color: 'text-blue-600' },
    { label: '今日订单', value: '156单', change: '+12%', color: 'text-purple-600' },
    { label: '新增会员', value: '12人', change: '+5%', color: 'text-orange-600' },
  ];

  const recentOrders = [
    { id: 'ORD202401010001', name: '单人日场票', quantity: 2, amount: '¥256.00', status: 'paid', time: '2024-01-01 10:30' },
    { id: 'ORD202401020001', name: '家庭套票', quantity: 1, amount: '¥298.00', status: 'used', time: '2024-01-02 14:20' },
    { id: 'ORD202401030001', name: '双人情侣票', quantity: 1, amount: '¥218.00', status: 'refunded', time: '2024-01-03 16:45' },
    { id: 'ORD202401040001', name: '年卡会员', quantity: 1, amount: '¥998.00', status: 'paid', time: '2024-01-04 09:15' },
  ];

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { text: string; className: string }> = {
      paid: { text: '已支付', className: 'bg-green-100 text-green-800' },
      used: { text: '已使用', className: 'bg-blue-100 text-blue-800' },
      refunded: { text: '已退款', className: 'bg-red-100 text-red-800' },
    };
    return statuses[status] || { text: status, className: 'bg-gray-100 text-gray-800' };
  };

  return (
    <>
      <h2 className="text-lg font-bold text-gray-900">工作台</h2>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-4">快捷操作</h3>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/tickets/types')}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Ticket className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-center text-gray-700">票种管理</p>
          </button>
          <button
            onClick={() => navigate('/admin/members')}
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-center text-gray-700">会员管理</p>
          </button>
          <button
            onClick={() => navigate('/admin/assets')}
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-center text-gray-700">资产管理</p>
          </button>
          <button
            onClick={() => navigate('/admin/reports/sales')}
            className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-center text-gray-700">报表查看</p>
          </button>
        </div>
      </div>

      {/* 最近订单 */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">最近订单</h3>
          <button onClick={() => navigate('/admin/orders')} className="text-sm text-blue-600">查看全部</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">订单号</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">票种</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">数量</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">金额</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">时间</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <EmptyState 
                      icon={<FileText className="w-8 h-8" />}
                      title="暂无订单数据"
                      description="暂时没有订单记录，请稍后再试"
                      action={{
                        label: '刷新页面',
                        onClick: () => window.location.reload()
                      }}
                    />
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, index) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.name}</td>
                      <td className="py-3 px-4 text-sm">{order.quantity}</td>
                      <td className="py-3 px-4 text-sm">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 ${statusInfo.className} text-xs rounded`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{order.time}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}