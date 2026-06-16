import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import {
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';

export default function AdminDashboard() {
  const { dashboardStats, devices, announcements, fetchDashboard } = useStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = dashboardStats || {
    todayRevenue: 0,
    todayOrders: 0,
    todayMembers: 0,
    todayVisitors: 0,
    ticketSales: [],
    revenueByChannel: [],
    recentOrders: [],
  };

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const statCards = [
    {
      label: '今日营收',
      value: formatPrice(stats.todayRevenue),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      change: '+12.5%',
      trend: 'up',
    },
    {
      label: '今日订单',
      value: stats.todayOrders.toString(),
      icon: Ticket,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      change: '+8.2%',
      trend: 'up',
    },
    {
      label: '新增会员',
      value: stats.todayMembers.toString(),
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      change: '-2.1%',
      trend: 'down',
    },
    {
      label: '验票人次',
      value: stats.todayVisitors.toString(),
      icon: Activity,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      change: '+15.3%',
      trend: 'up',
    },
  ];

  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">工作台</h1>
            <p className="text-sm text-gray-500">欢迎回来，今日数据概览</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} text-white rounded-lg`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm text-gray-500 mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">最近订单</h2>
              <Link to="/admin/orders" className="text-sm text-primary-500 hover:text-primary-600">
                查看全部
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">订单号</th>
                    <th className="pb-3 font-medium">会员</th>
                    <th className="pb-3 font-medium">金额</th>
                    <th className="pb-3 font-medium">状态</th>
                    <th className="pb-3 font-medium">时间</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-mono text-sm">{order.orderNo}</td>
                      <td className="py-3 text-sm">{order.memberName}</td>
                      <td className="py-3 text-sm font-medium">¥{order.totalAmount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.payStatus === 'paid' ? 'bg-green-100 text-green-600' :
                          order.payStatus === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {order.payStatus === 'paid' ? '已支付' : order.payStatus === 'pending' ? '待支付' : '已退款'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-400">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stats.recentOrders.length === 0 && (
                <p className="text-center text-gray-400 py-8">暂无订单数据</p>
              )}
            </div>
          </div>

          {/* Device Status & Alerts */}
          <div className="space-y-6">
            {/* Device Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">设备状态</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">在线</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{onlineDevices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">离线</span>
                  </div>
                  <span className="text-lg font-bold text-gray-400">{offlineDevices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">故障</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    {devices.filter((d) => d.status === 'error').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h2 className="font-bold text-gray-800">告警信息</h2>
              </div>
              <div className="space-y-3">
                {devices.filter((d) => d.status !== 'online').slice(0, 3).map((device) => (
                  <div key={device.id} className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700">{device.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {device.status === 'offline' ? '设备离线' : '设备故障'}
                    </p>
                  </div>
                ))}
                {devices.filter((d) => d.status !== 'online').length === 0 && (
                  <p className="text-center text-gray-400 py-4">暂无告警</p>
                )}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">公告</h2>
              <div className="space-y-3">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700">{ann.title}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
