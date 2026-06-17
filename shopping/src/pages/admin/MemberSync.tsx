import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import { RefreshCw, RotateCcw, Clock, CheckCircle, XCircle, Search } from 'lucide-react';

export default function AdminMemberSync() {
  const [syncLogs, setSyncLogs] = useState([
    { id: '1', time: '2024-01-15 14:30:00', type: 'full', status: 'success', count: 1258, duration: '2分35秒' },
    { id: '2', time: '2024-01-15 10:00:00', type: 'incremental', status: 'success', count: 32, duration: '15秒' },
    { id: '3', time: '2024-01-14 22:00:00', type: 'full', status: 'success', count: 1245, duration: '2分42秒' },
    { id: '4', time: '2024-01-14 16:30:00', type: 'incremental', status: 'failed', count: 0, duration: '58秒', error: '网络超时' },
    { id: '5', time: '2024-01-14 10:00:00', type: 'incremental', status: 'success', count: 45, duration: '18秒' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = (type: 'full' | 'incremental') => {
    setIsSyncing(true);
    setTimeout(() => {
      const newLog = {
        id: String(Date.now()),
        time: new Date().toLocaleString('zh-CN'),
        type,
        status: 'success' as const,
        count: type === 'full' ? 1260 : 15,
        duration: type === 'full' ? '2分38秒' : '12秒',
      };
      setSyncLogs([newLog, ...syncLogs]);
      setIsSyncing(false);
      toast.success(`${type === 'full' ? '全量' : '增量'}同步完成`);
    }, 2000);
  };

  const filteredLogs = syncLogs.filter(log =>
    log.type.includes(searchTerm.toLowerCase()) ||
    log.status.includes(searchTerm.toLowerCase())
  );

  const getTypeText = (type: string) => {
    return type === 'full' ? '全量同步' : '增量同步';
  };

  const getStatusInfo = (status: string) => {
    return status === 'success' 
      ? { text: '成功', className: 'bg-green-100 text-green-800', icon: CheckCircle }
      : { text: '失败', className: 'bg-red-100 text-red-800', icon: XCircle };
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">超市会员同步</h2>
        <div className="flex gap-2">
          <Button onClick={() => handleSync('incremental')} disabled={isSyncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            增量同步
          </Button>
          <Button onClick={() => handleSync('full')} disabled={isSyncing} className="bg-orange-600 hover:bg-orange-700">
            <RotateCcw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            全量同步
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">今日同步会员</div>
          <div className="text-2xl font-bold text-blue-600">87</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">累计会员数</div>
          <div className="text-2xl font-bold text-green-600">1,258</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">本月同步次数</div>
          <div className="text-2xl font-bold text-purple-600">32</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">成功率</div>
          <div className="text-2xl font-bold text-orange-600">98%</div>
        </div>
      </div>

      {/* 同步日志 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索同步类型或状态..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">同步类型</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">同步数量</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">耗时</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">错误信息</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const statusInfo = getStatusInfo(log.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={log.id}>
                    <td className="px-4 py-3">
                      <Clock className="w-4 h-4 text-gray-400 inline mr-2" />
                      {log.time}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${log.type === 'full' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                        {getTypeText(log.type)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{log.count}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-500">{log.duration}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusInfo.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{log.error || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}