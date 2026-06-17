import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from '../../components/ui/Toast';
import { QrCode, CheckCircle, XCircle, Camera } from 'lucide-react';

export default function ServiceVerify() {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!qrCode) {
      toast.error('请输入或扫描二维码');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/tickets/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode }),
      });
      const data = await response.json();
      
      if (data.success) {
        setVerifyResult({
          success: true,
          ticket: data.data.ticket,
          user: data.data.user,
        });
        toast.success('验票成功');
      } else {
        setVerifyResult({
          success: false,
          message: data.error,
        });
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('验票失败');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = () => {
    // 模拟扫描二维码
    setQrCode('QR202401010001');
    toast.info('已模拟扫描二维码');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">扫码验票</h1>
          <button onClick={() => navigate('/service')} className="text-sm">
            返回
          </button>
        </div>
      </div>

      {/* 扫码区域 */}
      <div className="bg-white px-4 py-6">
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-4">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">请扫描门票二维码或手动输入</p>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="请输入二维码编号"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            className="text-center"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleScan}
              variant="outline"
              className="flex-1"
              icon={<Camera className="w-4 h-4" />}
            >
              扫描二维码
            </Button>
            <Button
              onClick={handleVerify}
              loading={loading}
              className="flex-1"
            >
              验票
            </Button>
          </div>
        </div>
      </div>

      {/* 验票结果 */}
      {verifyResult && (
        <div className="bg-white mt-2 px-4 py-4">
          {verifyResult.success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-600 mb-2">验票成功</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">票种</span>
                  <span className="font-medium">{verifyResult.ticket.ticketName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">用户</span>
                  <span className="font-medium">{verifyResult.user?.nickname || '未知'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">验票时间</span>
                  <span className="font-medium">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-red-600 mb-2">验票失败</h3>
              <p className="text-gray-500">{verifyResult.message}</p>
            </div>
          )}
        </div>
      )}

      {/* 验票记录 */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">最近验票记录</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">单人日场票</p>
              <p className="text-xs text-gray-500 mt-1">张三 · 10:30</p>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">已通过</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">家庭套票</p>
              <p className="text-xs text-gray-500 mt-1">李四 · 10:25</p>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">已通过</span>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/service')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">验票</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">工单</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
