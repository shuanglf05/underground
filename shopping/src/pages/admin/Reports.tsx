import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { DollarSign, TrendingUp, Users, Ticket, Cpu, FileSpreadsheet, Download, Calendar } from 'lucide-react';

export default function AdminReports() {
  const { type } = useParams<{ type?: string }>();
  const activeType = type || 'sales';
  const [dateRange, setDateRange] = useState('month');

  const reportConfig = {
    sales: {
      title: '销售日报/月报/年报',
      icon: DollarSign,
      color: 'blue',
      stats: [
        { label: '今日销售额', value: '¥128,500', change: '+12.5%', trend: 'up' },
        { label: '本月销售额', value: '¥2,340,000', change: '+8.3%', trend: 'up' },
        { label: '本年销售额', value: '¥28,560,000', change: '+15.2%', trend: 'up' },
        { label: '订单数量', value: '1,856', change: '+5.8%', trend: 'up' },
      ],
      chartData: [
        { month: '1月', amount: 230 },
        { month: '2月', amount: 280 },
        { month: '3月', amount: 320 },
        { month: '4月', amount: 290 },
        { month: '5月', amount: 350 },
        { month: '6月', amount: 420 },
      ],
    },
    business: {
      title: '业态经营分析报表',
      icon: TrendingUp,
      color: 'green',
      stats: [
        { label: '电玩区营收', value: '¥850,000', change: '+18%', trend: 'up' },
        { label: 'VR体验区', value: '¥620,000', change: '+12%', trend: 'up' },
        { label: '餐饮区', value: '¥450,000', change: '+8%', trend: 'up' },
        { label: '零售区', value: '¥420,000', change: '+5%', trend: 'up' },
      ],
      chartData: [
        { category: '电玩', value: 850 },
        { category: 'VR', value: 620 },
        { category: '餐饮', value: 450 },
        { category: '零售', value: 420 },
        { category: '其他', value: 180 },
      ],
    },
    member: {
      title: '会员分析报表',
      icon: Users,
      color: 'purple',
      stats: [
        { label: '新增会员', value: '256', change: '+25%', trend: 'up' },
        { label: '活跃会员', value: '1,258', change: '+12%', trend: 'up' },
        { label: '会员消费额', value: '¥1,280,000', change: '+18%', trend: 'up' },
        { label: '复购率', value: '68%', change: '+8%', trend: 'up' },
      ],
      chartData: [
        { level: '普通', count: 450 },
        { level: '银卡', count: 320 },
        { level: '金卡', count: 280 },
        { level: '铂金', count: 150 },
        { level: '钻石', count: 58 },
      ],
    },
    ticket: {
      title: '票务分析报表',
      icon: Ticket,
      color: 'orange',
      stats: [
        { label: '今日出票', value: '326', change: '+15%', trend: 'up' },
        { label: '本月出票', value: '8,560', change: '+12%', trend: 'up' },
        { label: '退票率', value: '3.2%', change: '-2%', trend: 'down' },
        { label: '销售额', value: '¥2,340,000', change: '+18%', trend: 'up' },
      ],
      chartData: [
        { type: '单人日场', amount: 3200 },
        { type: '单人夜场', amount: 2100 },
        { type: '家庭套票', amount: 1800 },
        { type: '情侣票', amount: 1200 },
        { type: '年卡', amount: 260 },
      ],
    },
    device: {
      title: '设备使用分析报表',
      icon: Cpu,
      color: 'cyan',
      stats: [
        { label: '设备总数', value: '156', change: '+5', trend: 'up' },
        { label: '在线率', value: '98.5%', change: '+0.5%', trend: 'up' },
        { label: '故障率', value: '1.2%', change: '-0.3%', trend: 'down' },
        { label: '使用率', value: '78%', change: '+5%', trend: 'up' },
      ],
      chartData: [
        { device: '闸机', usage: 95 },
        { device: '储物柜', usage: 72 },
        { device: '游戏机', usage: 85 },
        { device: 'VR设备', usage: 68 },
        { device: '售货机', usage: 78 },
      ],
    },
    finance: {
      title: '财务对账报表',
      icon: FileSpreadsheet,
      color: 'red',
      stats: [
        { label: '本月收入', value: '¥5,680,000', change: '+12%', trend: 'up' },
        { label: '本月支出', value: '¥2,340,000', change: '+8%', trend: 'up' },
        { label: '净利润', value: '¥3,340,000', change: '+15%', trend: 'up' },
        { label: '毛利率', value: '58.8%', change: '+2%', trend: 'up' },
      ],
      chartData: [
        { month: '1月', income: 420, expense: 180 },
        { month: '2月', income: 380, expense: 165 },
        { month: '3月', income: 450, expense: 190 },
        { month: '4月', income: 520, expense: 210 },
        { month: '5月', income: 580, expense: 230 },
        { month: '6月', income: 568, expense: 234 },
      ],
    },
    asset: {
      title: '资产运营报表',
      icon: FileSpreadsheet,
      color: 'indigo',
      stats: [
        { label: '资产总额', value: '¥85,600,000', change: '+5%', trend: 'up' },
        { label: '设备资产', value: '¥42,300,000', change: '+8%', trend: 'up' },
        { label: '房屋资产', value: '¥43,300,000', change: '+3%', trend: 'up' },
        { label: '资产利用率', value: '85%', change: '+5%', trend: 'up' },
      ],
      chartData: [
        { asset: '设备', value: 4230 },
        { asset: '房屋', value: 4330 },
        { asset: '家具', value: 280 },
        { asset: '其他', value: 370 },
      ],
    },
  };

  const config = reportConfig[activeType as keyof typeof reportConfig] || reportConfig.sales;
  const Icon = config.icon;

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-500' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' },
    };
    return colors[color]?.[type] || '';
  };

  const maxChartValue = Math.max(...config.chartData.map(d => ('amount' in d ? d.amount : d.value)));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
              <option value="year">本年</option>
            </select>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {config.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className={`flex items-center gap-1 text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <span>↑</span> : <span>↓</span>}
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon className={`w-5 h-5 ${getColorClass(config.color, 'text')}`} />
          <h3 className="font-medium text-gray-900">数据趋势</h3>
        </div>
        
        {activeType === 'finance' ? (
          <div className="space-y-4">
            {config.chartData.map((d: any, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600">{d.month}</span>
                <div className="flex-1 flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>收入</span>
                      <span>¥{(d.income * 10000).toLocaleString()}</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${(d.income / 600) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>支出</span>
                      <span>¥{(d.expense * 10000).toLocaleString()}</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-400 rounded-full transition-all"
                        style={{ width: `${(d.expense / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-end justify-between h-64 gap-6">
            {config.chartData.map((d: any, index) => {
              const value = 'amount' in d ? d.amount : d.value;
              const label = 'month' in d ? d.month : 'category' in d ? d.category : 'level' in d ? d.level : 'type' in d ? d.type : 'device' in d ? d.device : 'asset' in d ? d.asset : '';
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {'amount' in d ? `¥${(value * 10000).toLocaleString()}` : value}
                  </div>
                  <div 
                    className={`w-full h-48 ${getColorClass(config.color, 'bg')} rounded-t-lg transition-all`}
                    style={{ height: `${(value / maxChartValue) * 100}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-2">{label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}