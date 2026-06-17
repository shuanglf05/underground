import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';

export default function CounterSecurity() {
  const navigate = useNavigate();
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const handleChangePassword = () => {
    if (!passwords.old) {
      toast.error('请输入旧密码');
      return;
    }
    if (!passwords.new || passwords.new.length < 6) {
      toast.error('新密码至少6位');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error('两次输入的密码不一致');
      return;
    }
    toast.success('密码修改成功');
    setShowChangePwd(false);
    setPasswords({ old: '', new: '', confirm: '' });
  };

  const menuItems = [
    { icon: Lock, label: '修改密码', onClick: () => setShowChangePwd(true) },
    { icon: User, label: '修改姓名', onClick: () => toast.info('功能开发中') },
    { icon: Phone, label: '绑定手机号', onClick: () => toast.info('功能开发中') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter/profile')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">账号安全</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-2 rounded-xl overflow-hidden">
        <div className="p-4 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-medium text-red-900">安全提醒</p>
              <p className="text-sm text-red-700">请定期更换密码，确保账号安全</p>
            </div>
          </div>
        </div>

        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-gray-900">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-500" />
          <div>
            <p className="font-medium text-gray-900">账号状态</p>
            <p className="text-sm text-green-600">账号安全正常</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showChangePwd}
        onClose={() => { setShowChangePwd(false); setPasswords({ old: '', new: '', confirm: '' }); }}
        title="修改密码"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">旧密码</label>
            <input
              type="password"
              value={passwords.old}
              onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
              placeholder="请输入旧密码"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">新密码</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              placeholder="请输入新密码（至少6位）"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              placeholder="请再次输入新密码"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button onClick={handleChangePassword} className="w-full">确认修改</Button>
        </div>
      </Modal>
    </div>
  );
}