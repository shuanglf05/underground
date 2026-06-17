import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Ticket, Clock, BarChart3 } from 'lucide-react';

export default function DataDetail() {
  const navigate = useNavigate();

  const dailyData = [
    { date: '01-09', revenue: 42000, visitors: 210, orders: 120 },
    { date: '01-10', revenue: 48000, visitors: 245, orders: 135 },
    { date: '01-11', revenue: 55000, visitors: 280, orders: 155 },
    { date: '01-12', revenue: 45000, visitors: 225, orders: 125 },
    { date: '01-13', revenue: 62000, visitors: 320, orders: 175 },
    { date: '01-14', revenue: 78000, visitors: 395, orders: 220 },
    { date: '01-15', revenue: 52800, visitors: 320, orders: 156 },
  ];

  const maxRevenue = Math.max(...dailyData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/service')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">今日数据详情</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="bg-white mx-4 -mt-6 rounded-xl p-4 shadow-lg relative z-10">
        <h3 className="text-base font-bold text-gray-900 mb-4">本周数据概览</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">¥382,800</p>
            <p className="text-xs text-gray-500 mt-1">总收入</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,995</p>
            <p className="text-xs text-gray-500 mt-1">总客流</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Ticket className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,086</p>
            <p className="text-xs text-gray-500 mt-1">总订单</p>
          </div>
        </div>
      </div>

      {/* 趋势图表 */}
      <div className="bg-white mx-4 mt-2 rounded-xl p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">每日营收趋势</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {dailyData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end" style={{ height: '140px' }}>
                <span className="text-xs text-gray-600 mb-1">¥{(day.revenue / 1000).toFixed(0)}K</span>
                <div 
                  className="w-full bg-green-500 rounded-t transition-all"
                  style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 详细数据 */}
      <div className="bg-white mx-4 mt-2 rounded-xl p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">每日明细</h3>
        <div className="space-y-3">
          {dailyData.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{day.date}</span>
                <span className="text-sm text-gray-500 ml-2">周一</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-600">¥{day.revenue.toLocaleString()}</span>
                <span className="text-blue-600">{day.visitors}人</span>
                <span className="text-purple-600">{day.orders}单</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/service')} className="flex flex-col items-center gap-1 text-green-600">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/service/verify')} className="flex flex-col items-center gap-1 text-gray-500">
            <Ticket className="w-5 h-5" />
            <span className="text-xs">验票</span>
          </button>
          <button onClick={() => navigate('/service/workorders')} className="flex flex-col items-center gap-1 text-gray-500">
            <Clock className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button onClick={() => navigate('/service/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <Users className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}