import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ticket, Watch, ShoppingCart, 
  Users, BarChart3, User 
} from 'lucide-react';
import { toast } from '../../components/ui/Toast';

export default function CounterHome() {
  const navigate = useNavigate();
  
  const handleOpenTable = (tableNum: number) => {
    toast.success(`已成功开台：${tableNum}号台`);
  };

  const menuItems = [
    { icon: Ticket, label: '门票销售', path: '/counter/sales', color: 'bg-blue-500' },
    { icon: Watch, label: '手环管理', path: '/counter/bracelets', color: 'bg-purple-500' },
    { icon: ShoppingCart, label: '商品收银', path: '/counter/cashier', color: 'bg-green-500' },
    { icon: Users, label: '客户服务', path: '/counter/service', color: 'bg-orange-500' },
  ];

  const stats = [
    { label: '今日销售额', value: '¥15,680', change: '+12%' },
    { label: '今日订单', value: '45', change: '+8%' },
    { label: '当前排队', value: '3', unit: '人' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">揽月城广场 - 吧台端</h1>
            <p className="text-sm opacity-90 mt-1">当前班次：08:00-16:00</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 bg-white/20 rounded-full text-sm">
              交接班
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
          <h2 className="text-base font-bold text-gray-900">今日业绩</h2>
          <button className="text-sm text-purple-600 flex items-center gap-1">
            <BarChart3 className="w-4 h-4" /> 查看详情
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              {stat.change && (
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 快捷功能 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-4">快捷功能</h2>
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

      {/* 快速开台 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">快速开台</h2>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleOpenTable(num)}
              className="py-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors active:scale-95"
            >
              {num}号台
            </button>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/counter')} className="flex flex-col items-center gap-1 text-purple-600">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button 
            onClick={() => navigate('/counter/sales')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <Ticket className="w-5 h-5" />
            <span className="text-xs">售票</span>
          </button>
          <button onClick={() => navigate('/counter/cashier')} className="flex flex-col items-center gap-1 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">收银</span>
          </button>
          <button onClick={() => navigate('/counter/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
