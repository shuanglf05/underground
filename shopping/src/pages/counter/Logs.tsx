import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, User } from 'lucide-react';

export default function CounterLogs() {
  const navigate = useNavigate();

  const logs = [
    { id: 1, action: '门票销售', detail: '售出单人日场票 x1，金额 ¥128', time: '10:30', operator: '李吧台' },
    { id: 2, action: '手环发放', detail: '发放手环 RFID123 给客户张三', time: '10:25', operator: '李吧台' },
    { id: 3, action: '商品收银', detail: '矿泉水 x2、爆米花 x1，合计 ¥21', time: '10:18', operator: '李吧台' },
    { id: 4, action: '订单查询', detail: '查询订单 ORD20240115002', time: '10:10', operator: '李吧台' },
    { id: 5, action: '快速开台', detail: '开台 3号台', time: '10:05', operator: '李吧台' },
    { id: 6, action: '登录系统', detail: '使用账号 libatai 登录', time: '08:00', operator: '李吧台' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter/profile')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">操作日志</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-2 rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无操作记录</p>
          </div>
        ) : (
          logs.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{item.action}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <User className="w-3 h-3" />
                    <span>{item.operator}</span>
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