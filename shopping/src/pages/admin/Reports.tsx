import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { BarChart3, Users, Ticket, Cpu, Download, Calendar, TrendingUp, PieChart } from 'lucide-react';

interface BusinessReport {
  totalSales: number;
  orderCount: number;
  avgOrderValue: number;
  salesTrend: { date: string; amount: number; orders: number }[];
  channelContribution: { channel: string; amount: number; percentage: number }[];
}

interface MemberReport {
  totalMembers: number;
  newMembers: number;
  activeMembers: number;
  avgConsumption: number;
  memberGrowth: { date: string; count: number }[];
  levelDistribution: { level: string; count: number; percentage: number }[];
  retentionRate: number;
}

interface TicketReport {
  totalTickets: number;
  verifiedTickets: number;
  refundedTickets: number;
  verificationRate: number;
  refundRate: number;
  ticketTypeSales: { type: string; sales: number; percentage: number }[];
  dailySales: { date: string; sales: number; verified: number }[];
}

interface DeviceReport {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  avgUsageHours: number;
  deviceUsage: { deviceId: number; name: string; usageCount: number; usageHours: number; status: string }[];
  failureRate: number;
}

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState('business');
  const [businessReport, setBusinessReport] = useState<BusinessReport | null>(null);
  const [memberReport, setMemberReport] = useState<MemberReport | null>(null);
  const [ticketReport, setTicketReport] = useState<TicketReport | null>(null);
  const [deviceReport, setDeviceReport] = useState<DeviceReport | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2024-06-01', end: '2024-06-30' });
  const [message, setMessage] = useState('');

  const handleExportReport = async () => {
    const query = `startDate=${dateRange.start}&endDate=${dateRange.end}&type=${activeTab}`;
    const res = await fetch(`/api/reports/export?${query}`);
    const data = await res.json();
    if (data.success) {
      setMessage('报表导出成功');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('导出失败：' + data.error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [activeTab, dateRange]);

  const fetchReports = async () => {
    const query = `startDate=${dateRange.start}&endDate=${dateRange.end}`;
    
    if (activeTab === 'business') {
      const res = await fetch(`/api/reports/business?${query}`);
      const data = await res.json();
      if (data.success) setBusinessReport(data.data);
    } else if (activeTab === 'member') {
      const res = await fetch(`/api/reports/member?${query}`);
      const data = await res.json();
      if (data.success) setMemberReport(data.data);
    } else if (activeTab === 'ticket') {
      const res = await fetch(`/api/reports/ticket?${query}`);
      const data = await res.json();
      if (data.success) setTicketReport(data.data);
    } else if (activeTab === 'device') {
      const res = await fetch(`/api/reports/device?${query}`);
      const data = await res.json();
      if (data.success) setDeviceReport(data.data);
    }
  };

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const renderBarChart = (data: { date: string; amount: number }[], color: string) => {
    const maxValue = Math.max(...data.map(d => d.amount), 1);
    return (
      <div className="flex items-end gap-1 h-32">
        {data.slice(-7).map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full rounded-t transition-all ${color}`}
              style={{ height: `${(item.amount / maxValue) * 100}%`, minHeight: '4px' }}
            />
            <span className="text-xs text-gray-400 mt-1">{item.date.slice(5)}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = (data: { type: string; percentage: number }[]) => {
    const colors = ['bg-primary-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    let cumulative = 0;
    
    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const strokeDasharray = `${item.percentage * 2.51} 251`;
            const strokeDashoffset = -cumulative * 2.51;
            cumulative += item.percentage;
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeWidth="20"
                className={colors[index % colors.length]}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-600">{cumulative}%</span>
        </div>
      </div>
    );
  };

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
            <h1 className="text-2xl font-bold text-gray-800">报表中心</h1>
            <p className="text-sm text-gray-500">多维度数据分析与统计报表</p>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            导出报表
          </button>
        </header>

        {/* Date Range */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">日期范围</span>
            </div>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-400">至</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'business' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              经营分析
            </button>
            <button
              onClick={() => setActiveTab('member')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'member' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              会员分析
            </button>
            <button
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'ticket' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Ticket className="w-5 h-5" />
              票务分析
            </button>
            <button
              onClick={() => setActiveTab('device')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'device' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Cpu className="w-5 h-5" />
              设备分析
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'business' && businessReport && (
              <>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-primary-100">总销售额</p>
                    <p className="text-2xl font-bold">{formatPrice(businessReport.totalSales)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-blue-100">订单数</p>
                    <p className="text-2xl font-bold">{businessReport.orderCount}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-green-100">客单价</p>
                    <p className="text-2xl font-bold">{formatPrice(businessReport.avgOrderValue)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-purple-100">同比增长</p>
                    <p className="text-2xl font-bold">+12.5%</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">销售趋势</h3>
                    {renderBarChart(businessReport.salesTrend.map(d => ({ date: d.date, amount: d.amount })), 'bg-primary-500')}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">渠道贡献</h3>
                    <div className="flex items-center gap-4">
                      {renderPieChart(businessReport.channelContribution)}
                      <div className="flex-1">
                        {businessReport.channelContribution.map((item, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{item.channel}</span>
                            <span className="text-sm font-medium">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'member' && memberReport && (
              <>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-primary-100">会员总数</p>
                    <p className="text-2xl font-bold">{memberReport.totalMembers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-blue-100">新增会员</p>
                    <p className="text-2xl font-bold">{memberReport.newMembers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-green-100">活跃会员</p>
                    <p className="text-2xl font-bold">{memberReport.activeMembers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-orange-100">留存率</p>
                    <p className="text-2xl font-bold">{memberReport.retentionRate}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">会员增长趋势</h3>
                    {renderBarChart(memberReport.memberGrowth.map(d => ({ date: d.date, amount: d.count })), 'bg-blue-500')}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">等级分布</h3>
                    <div className="flex items-center gap-4">
                      {renderPieChart(memberReport.levelDistribution)}
                      <div className="flex-1">
                        {memberReport.levelDistribution.map((item, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{item.level}</span>
                            <span className="text-sm font-medium">{item.count}人</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'ticket' && ticketReport && (
              <>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-primary-100">销售票数</p>
                    <p className="text-2xl font-bold">{ticketReport.totalTickets}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-green-100">已核销</p>
                    <p className="text-2xl font-bold">{ticketReport.verifiedTickets}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-blue-100">核销率</p>
                    <p className="text-2xl font-bold">{ticketReport.verificationRate}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-red-100">退票率</p>
                    <p className="text-2xl font-bold">{ticketReport.refundRate}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">每日销售</h3>
                    {renderBarChart(ticketReport.dailySales.map(d => ({ date: d.date, amount: d.sales })), 'bg-green-500')}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-700 mb-4">票种销售</h3>
                    <div className="space-y-3">
                      {ticketReport.ticketTypeSales.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{item.type}</span>
                            <span className="font-medium">{item.sales}张</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'device' && deviceReport && (
              <>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-primary-100">设备总数</p>
                    <p className="text-2xl font-bold">{deviceReport.totalDevices}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-green-100">在线设备</p>
                    <p className="text-2xl font-bold">{deviceReport.onlineDevices}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-orange-100">离线设备</p>
                    <p className="text-2xl font-bold">{deviceReport.offlineDevices}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white">
                    <p className="text-sm text-red-100">故障率</p>
                    <p className="text-2xl font-bold">{deviceReport.failureRate}%</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-gray-700 mb-4">设备使用情况</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500">
                          <th className="px-4 py-2">设备名称</th>
                          <th className="px-4 py-2">使用次数</th>
                          <th className="px-4 py-2">使用时长</th>
                          <th className="px-4 py-2">状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deviceReport.deviceUsage.map((device) => (
                          <tr key={device.deviceId} className="border-t border-gray-200">
                            <td className="px-4 py-3 text-sm">{device.name}</td>
                            <td className="px-4 py-3 text-sm">{device.usageCount}</td>
                            <td className="px-4 py-3 text-sm">{device.usageHours}小时</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                device.status === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {device.status === 'online' ? '在线' : '离线'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
