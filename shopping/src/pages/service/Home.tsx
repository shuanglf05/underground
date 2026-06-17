import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, ShoppingCart, Wrench, 
  BarChart3, Bell, User 
} from 'lucide-react';

export default function ServiceHome() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: QrCode, label: '扫码验票', path: '/service/verify', color: 'bg-blue-500' },
    { icon: ShoppingCart, label: '现场加购', path: '/service/orders', color: 'bg-green-500' },
    { icon: Wrench, label: '设备上报', path: '/service/devices', color: 'bg-orange-500' },
    { icon: Wrench, label: '维修工单', path: '/service/workorders', color: 'bg-purple-500' },
  ];

  const stats = [
    { label: '今日验票', value: '128', unit: '张' },
    { label: '今日客流', value: '256', unit: '人' },
    { label: '待处理工单', value: '3', unit: '个' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">揽月城广场 - 服务端</h1>
            <p className="text-sm opacity-90 mt-1">今日值班：张服务</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button>
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 今日数据 */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">今日数据</h2>
          <button onClick={() => navigate('/service/data-detail')} className="text-sm text-green-600 flex items-center gap-1">
            <BarChart3 className="w-4 h-4" /> 查看详情
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-4">常用功能</h2>
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 消息通知 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">消息通知</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">储物柜A区故障报警</p>
              <p className="text-xs text-gray-500 mt-1">10分钟前</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">自动售货机B区需补货</p>
              <p className="text-xs text-gray-500 mt-1">30分钟前</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/service')} className="flex flex-col items-center gap-1 text-green-600">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button 
            onClick={() => navigate('/service/verify')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs">验票</span>
          </button>
          <button onClick={() => navigate('/service/workorders')} className="flex flex-col items-center gap-1 text-gray-500">
            <Wrench className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button onClick={() => navigate('/service/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
