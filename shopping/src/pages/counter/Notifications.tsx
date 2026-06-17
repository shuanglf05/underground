import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, CheckCircle } from 'lucide-react';

export default function CounterNotifications() {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: '订单提醒', content: '订单 ORD20240115001 已完成支付', time: '5分钟前', read: false },
    { id: 2, title: '手环归还', content: '客户张三已归还手环 RFID123', time: '15分钟前', read: false },
    { id: 3, title: '系统通知', content: '系统将于23:00进行维护升级', time: '1小时前', read: true },
    { id: 4, title: '交接班提醒', content: '距离下班时间还有30分钟', time: '2小时前', read: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter/profile')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">消息通知</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-2 rounded-xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="py-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无消息通知</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 border-b border-gray-100 last:border-b-0 ${
                !item.read ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  !item.read ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Bell className={`w-5 h-5 ${!item.read ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                    {item.read && (
                      <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}