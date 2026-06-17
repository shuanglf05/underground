import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from '../../components/ui/Toast';
import { Phone, Lock, MessageCircle } from 'lucide-react';

export default function UserLogin() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [mode, setMode] = useState<'phone' | 'wechat'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  // 发送验证码
  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      toast.error('请输入正确的手机号');
      return;
    }

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('验证码已发送');
        // 开始倒计时
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(data.error || '发送失败');
      }
    } catch (error) {
      toast.error('发送失败');
    }
  };

  // 手机号登录
  const handlePhoneLogin = async () => {
    if (!phone || phone.length !== 11) {
      toast.error('请输入正确的手机号');
      return;
    }
    if (!code || code.length !== 6) {
      toast.error('请输入6位验证码');
      return;
    }

    setLoading(true);
    try {
      const success = await login(phone, code);
      if (success) {
        toast.success('登录成功');
        navigate('/user');
      } else {
        toast.error('登录失败，请重试');
      }
    } catch (error) {
      toast.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  // 微信登录
  const handleWechatLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/wechat-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'wechat_code' }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('登录成功');
        navigate('/user');
      } else {
        toast.error('登录失败');
      }
    } catch (error) {
      toast.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-500 flex flex-col">
      {/* 顶部 */}
      <div className="px-4 pt-12 pb-8 text-white text-center">
        <h1 className="text-2xl font-bold">揽月城广场</h1>
        <p className="text-sm opacity-90 mt-2">欢迎回来</p>
      </div>

      {/* 登录表单 */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
        {/* 切换登录方式 */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('phone')}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              mode === 'phone' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500'
            }`}
          >
            手机号登录
          </button>
          <button
            onClick={() => setMode('wechat')}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              mode === 'wechat' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500'
            }`}
          >
            微信登录
          </button>
        </div>

        {mode === 'phone' ? (
          <div className="space-y-4">
            <Input
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              type="tel"
              maxLength={11}
            />
            <div className="flex gap-2">
              <Input
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                type="text"
                maxLength={6}
                className="flex-1"
              />
              <button
                onClick={handleSendCode}
                disabled={countdown > 0}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  countdown > 0 
                    ? 'bg-gray-200 text-gray-500' 
                    : 'bg-blue-600 text-white'
                }`}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
            <Button
              onClick={handlePhoneLogin}
              loading={loading}
              className="w-full"
              size="lg"
            >
              登录
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 mb-6">使用微信快速登录</p>
              <Button
                onClick={handleWechatLogin}
                loading={loading}
                className="w-full bg-green-500 hover:bg-green-600"
                size="lg"
              >
                微信一键登录
              </Button>
            </div>
          </div>
        )}

        {/* 协议 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            登录即表示同意
            <button className="text-blue-600">《用户协议》</button>
            和
            <button className="text-blue-600">《隐私政策》</button>
          </p>
        </div>

        {/* 其他登录方式 */}
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500">其他登录方式</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <button 
              onClick={() => setMode('wechat')}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
