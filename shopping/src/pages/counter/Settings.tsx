import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Bell, Moon, Sun, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { toast } from '../../components/ui/Toast';

export default function CounterSettings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleClearCache = () => {
    toast.success('缓存已清理');
  };

  const menuItems = [
    {
      icon: Bell,
      label: '消息通知',
      description: '接收订单提醒和系统通知',
      type: 'toggle',
      value: notifications,
      onChange: () => setNotifications(!notifications),
    },
    {
      icon: darkMode ? Moon : Sun,
      label: '深色模式',
      description: '切换深色/浅色主题',
      type: 'toggle',
      value: darkMode,
      onChange: () => setDarkMode(!darkMode),
    },
    {
      icon: soundEnabled ? Volume2 : VolumeX,
      label: '提示音',
      description: '操作时播放提示音',
      type: 'toggle',
      value: soundEnabled,
      onChange: () => setSoundEnabled(!soundEnabled),
    },
    {
      icon: RefreshCw,
      label: '清理缓存',
      description: '清除本地缓存数据',
      type: 'button',
      onClick: handleClearCache,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter/profile')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">系统设置</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-2 rounded-xl overflow-hidden">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 ${
              item.type === 'button' ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={item.type === 'button' ? item.onClick : undefined}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            {item.type === 'toggle' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.onChange();
                }}
                className={`w-12 h-6 rounded-full transition-colors ${
                  item.value ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    item.value ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            )}
            {item.type === 'button' && (
              <span className="text-purple-600 text-sm">点击清理</span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <div className="text-center">
          <Settings className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">版本号: v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">揽月城广场管理系统</p>
        </div>
      </div>
    </div>
  );
}