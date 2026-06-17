import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { 
  User, ChevronRight, Settings, Heart, HelpCircle, 
  MessageSquare, LogOut, Edit, Phone, Mail, MapPin,
  CreditCard, Gift, Bookmark
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');

  const profileInfo = {
    name: user?.nickname || '游客',
    phone: user?.phone || '',
    email: '',
    address: '北京市朝阳区',
    memberLevel: user?.memberLevel || 1,
  };

  const menuItems = [
    { icon: Heart, label: '我的收藏', path: '/user/favorites', badge: '12' },
    { icon: CreditCard, label: '支付设置', path: '/user/payment' },
    { icon: Gift, label: '优惠券', path: '/user/coupons', badge: '3' },
    { icon: HelpCircle, label: '帮助中心', path: '/user/help' },
    { icon: MessageSquare, label: '意见反馈', action: () => setShowFeedbackModal(true) },
    { icon: Settings, label: '设置', path: '/user/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/user/login');
  };

  const handleFeedback = () => {
    if (!feedbackContent.trim()) {
      toast.error('请输入反馈内容');
      return;
    }
    toast.success('反馈已提交，感谢您的意见');
    setShowFeedbackModal(false);
    setFeedbackContent('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">请先登录</p>
          <Button onClick={() => navigate('/user/login')}>立即登录</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/user')} className="text-white/80">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-lg font-bold">个人中心</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-white mx-4 -mt-6 rounded-xl shadow-lg p-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
            <User className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profileInfo.name}</h2>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                {profileInfo.memberLevel === 1 ? '普通会员' :
                 profileInfo.memberLevel === 2 ? '银卡会员' :
                 profileInfo.memberLevel === 3 ? '金卡会员' :
                 profileInfo.memberLevel === 4 ? '铂金会员' : '钻石会员'}
              </span>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1 text-sm text-blue-600 mt-1"
            >
              <Edit className="w-4 h-4" />
              编辑资料
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <button onClick={() => navigate('/user/my-tickets')} className="text-center">
            <p className="text-xl font-bold text-gray-900">4</p>
            <p className="text-xs text-gray-500 mt-1">我的门票</p>
          </button>
          <button onClick={() => navigate('/user/coupons')} className="text-center">
            <p className="text-xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-500 mt-1">优惠券</p>
          </button>
          <button onClick={() => navigate('/user/favorites')} className="text-center">
            <p className="text-xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500 mt-1">我的收藏</p>
          </button>
        </div>
      </div>

      {/* 菜单列表 */}
      <div className="bg-white mx-4 mt-4 rounded-xl overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => item.action ? item.action() : navigate(item.path)}
            className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>

      {/* 退出登录 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/user')} className="flex flex-col items-center gap-1 text-gray-500">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/user/tickets')} className="flex flex-col items-center gap-1 text-gray-500">
            <Gift className="w-5 h-5" />
            <span className="text-xs">购票</span>
          </button>
          <button onClick={() => navigate('/user/profile')} className="flex flex-col items-center gap-1 text-blue-600">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

      {/* 编辑资料弹窗 */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="编辑资料"
        size="lg"
      >
        <div className="p-4 space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-3">
              <User className="w-10 h-10" />
            </div>
            <button className="text-sm text-blue-600">更换头像</button>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              defaultValue={profileInfo.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">手机号</label>
            <input
              type="tel"
              defaultValue={profileInfo.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              defaultValue={profileInfo.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="w-full">保存修改</Button>
        </div>
      </Modal>

      {/* 意见反馈弹窗 */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title="意见反馈"
        size="lg"
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">反馈内容</label>
            <textarea
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              placeholder="请输入您的意见或建议..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="anonymous" className="rounded" />
            <label htmlFor="anonymous" className="text-sm text-gray-600">匿名反馈</label>
          </div>
          <Button onClick={handleFeedback} className="w-full">提交反馈</Button>
        </div>
      </Modal>
    </div>
  );
}