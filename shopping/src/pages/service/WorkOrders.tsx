import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { 
  Wrench, ChevronRight, Clock, AlertTriangle, 
  CheckCircle, XCircle, Send, Camera, FileText,
  ArrowLeft, Clock4, User
} from 'lucide-react';

export default function WorkOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');

  const workOrders = [
    {
      id: 'WO20240115001',
      title: '储物柜A区故障',
      device: '储物柜A01',
      type: 'locker',
      level: 'high',
      status: 'pending',
      location: 'A区-储物柜',
      description: '储物柜A01柜门无法正常关闭，影响顾客使用',
      createTime: '2024-01-15 10:30',
      assignee: '张师傅',
    },
    {
      id: 'WO20240115002',
      title: '自动售货机补货',
      device: '售货机B03',
      type: 'vending',
      level: 'medium',
      status: 'pending',
      location: 'B区-走廊',
      description: '饮料库存不足，需要补货',
      createTime: '2024-01-15 09:15',
      assignee: '李师傅',
    },
    {
      id: 'WO20240114003',
      title: 'VR设备故障',
      device: 'VR-02',
      type: 'vr',
      level: 'high',
      status: 'processing',
      location: 'VR体验区',
      description: 'VR设备画面卡顿，需要检修',
      createTime: '2024-01-14 14:20',
      assignee: '王师傅',
    },
    {
      id: 'WO20240114004',
      title: '台球灯故障',
      device: '台球桌-03',
      type: 'billiards',
      level: 'low',
      status: 'completed',
      location: '台球区',
      description: '台球桌3号灯不亮',
      createTime: '2024-01-14 11:00',
      assignee: '张师傅',
    },
  ];

  const filteredOrders = workOrders.filter(order => order.status === activeTab);

  const handleAction = () => {
    if (!actionType) {
      toast.error('请选择操作');
      return;
    }
    if (actionType === 'accept') {
      toast.success('已接单，开始维修');
    } else if (actionType === 'reject') {
      toast.success('已拒单，需填写原因');
    } else if (actionType === 'complete') {
      toast.success('维修完成');
    }
    setShowActionModal(false);
    setActionType('');
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/service')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">维修工单</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white px-4 py-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'pending' ? 'bg-green-50 text-green-600' : 'text-gray-500'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>待接单</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'pending' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {workOrders.filter(o => o.status === 'pending').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('processing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'processing' ? 'bg-green-50 text-green-600' : 'text-gray-500'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>维修中</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'processing' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {workOrders.filter(o => o.status === 'processing').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'completed' ? 'bg-green-50 text-green-600' : 'text-gray-500'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>已完成</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {workOrders.filter(o => o.status === 'completed').length}
          </span>
        </button>
      </div>

      {/* 工单列表 */}
      <div className="px-4 py-4 space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    order.level === 'high' ? 'bg-red-100 text-red-600' :
                    order.level === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {order.level === 'high' ? '紧急' : order.level === 'medium' ? '中等' : '一般'}
                  </span>
                  <span className="text-xs text-gray-500">{order.id}</span>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  order.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {order.status === 'pending' ? '待接单' :
                   order.status === 'processing' ? '维修中' : '已完成'}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{order.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{order.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock4 className="w-3 h-3" />
                    {order.createTime}
                  </span>
                  <span>{order.location}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无{activeTab === 'pending' ? '待接单' : activeTab === 'processing' ? '维修中' : '已完成'}的工单</p>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/service')} className="flex flex-col items-center gap-1 text-gray-500">
            <Wrench className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/service/verify')} className="flex flex-col items-center gap-1 text-gray-500">
            <Send className="w-5 h-5" />
            <span className="text-xs">验票</span>
          </button>
          <button onClick={() => navigate('/service/workorders')} className="flex flex-col items-center gap-1 text-green-600">
            <FileText className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button onClick={() => navigate('/service/profile')} className="flex flex-col items-center gap-1 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

     {/* 工单详情弹窗 */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="工单详情"
        size="lg"
      >
        {selectedOrder && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  selectedOrder.level === 'high' ? 'bg-red-100 text-red-600' :
                  selectedOrder.level === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {selectedOrder.level === 'high' ? '紧急' : selectedOrder.level === 'medium' ? '中等' : '一般'}
                </span>
                <span className="text-xs text-gray-500">{selectedOrder.id}</span>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                selectedOrder.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {selectedOrder.status === 'pending' ? '待接单' :
                 selectedOrder.status === 'processing' ? '维修中' : '已完成'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">{selectedOrder.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedOrder.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">设备名称</p>
                <p className="font-medium text-gray-900">{selectedOrder.device}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">位置</p>
                <p className="font-medium text-gray-900">{selectedOrder.location}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">创建时间</p>
                <p className="font-medium text-gray-900">{selectedOrder.createTime}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">分配人员</p>
                <p className="font-medium text-gray-900">{selectedOrder.assignee}</p>
              </div>
            </div>

            {selectedOrder.status === 'pending' && (
              <div className="flex gap-3">
                <Button 
                  onClick={() => { setActionType('reject'); setShowActionModal(true); }}
                  variant="outline"
                  className="flex-1"
                >
                  拒单
                </Button>
                <Button 
                  onClick={() => { setActionType('accept'); setShowActionModal(true); }}
                  className="flex-1"
                >
                  接单
                </Button>
              </div>
            )}

            {selectedOrder.status === 'processing' && (
              <Button onClick={() => { setActionType('complete'); setShowActionModal(true); }} className="w-full">
                完成维修
              </Button>
            )}

            {selectedOrder.status === 'completed' && (
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600">维修已完成</span>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 操作确认弹窗 */}
      <Modal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        title={actionType === 'accept' ? '确认接单' : actionType === 'reject' ? '拒单原因' : '完成维修'}
        size="lg"
      >
        <div className="p-4 space-y-4">
          {actionType === 'reject' && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">拒单原因</label>
              <textarea
                placeholder="请输入拒单原因..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          {actionType === 'complete' && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">维修记录</label>
              <textarea
                placeholder="请填写维修记录，包括处理方式、更换零件等..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          <Button onClick={handleAction} className="w-full">
            {actionType === 'accept' ? '确认接单' : actionType === 'reject' ? '提交拒单' : '确认完成'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}