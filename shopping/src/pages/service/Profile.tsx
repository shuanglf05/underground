import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Settings, HelpCircle, 
  LogOut, Bell, Shield, FileText, ChevronRight 
} from 'lucide-react';

export default function ServiceProfile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Bell, label: '消息通知', path: '/service/notifications' },
    { icon: Shield, label: '账号安全', path: '/service/security' },
    { icon: FileText, label: '操作日志', path: '/service/logs' },
    { icon: HelpCircle, label: '帮助中心', path: '/service/help' },
    { icon: Settings, label: '系统设置', path: '/service/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/service')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">个人中心</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-white mx-4 -mt-6 rounded-xl p-4 shadow-lg relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">张服务</h2>
            <p className="text-sm text-gray-500">服务端操作员</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">在线</span>
              <span className="text-xs text-gray-500">今日已处理: 12单</span>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷数据 */}
      <div className="bg-white mx-4 mt-2 rounded-xl p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">今日统计</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-gray-500 mt-1">验票次数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-xs text-gray-500 mt-1">加购订单</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-xs text-gray-500 mt-1">设备上报</p>
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="bg-white mx-4 mt-2 rounded-xl overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-900">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>

      {/* 退出登录 */}
      <button className="w-full mx-4 mt-4 py-3 bg-white rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors">
        <div className="flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </div>
      </button>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/service')} className="flex flex-col items-center gap-1 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/service/verify')} className="flex flex-col items-center gap-1 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="text-xs">验票</span>
          </button>
          <button onClick={() => navigate('/service/workorders')} className="flex flex-col items-center gap-1 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button onClick={() => navigate('/service/profile')} className="flex flex-col items-center gap-1 text-green-600">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}