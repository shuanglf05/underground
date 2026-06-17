import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Watch, Plus, RefreshCw, XCircle, Wallet, CreditCard, User, Search, ArrowLeft } from 'lucide-react';

export default function CounterBracelets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('issue');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [formData, setFormData] = useState({
    rfid: '',
    deposit: 200,
    balance: 0,
    phone: '',
  });

  const bracelets = [
    { id: 'BR001', rfid: 'RFID001', status: 'issued', deposit: 200, balance: 150, holder: '张三', issueTime: '2024-01-15 10:30' },
    { id: 'BR002', rfid: 'RFID002', status: 'issued', deposit: 200, balance: 80, holder: '李四', issueTime: '2024-01-15 11:00' },
    { id: 'BR003', rfid: 'RFID003', status: 'available', deposit: 0, balance: 0, holder: '', issueTime: '' },
    { id: 'BR004', rfid: 'RFID004', status: 'lost', deposit: 200, balance: 0, holder: '王五', issueTime: '2024-01-14 15:00' },
  ];

  const issuedBracelets = bracelets.filter(b => b.status === 'issued');
  const availableBracelets = bracelets.filter(b => b.status === 'available');

  const handleIssue = () => {
    if (!formData.rfid) {
      toast.error('请读取RFID');
      return;
    }
    toast.success(`手环发放成功！押金: ¥${formData.deposit}, 余额: ¥${formData.balance}`);
    setShowIssueModal(false);
    setFormData({ rfid: '', deposit: 200, balance: 0, phone: '' });
  };

  const handleReturn = () => {
    toast.success('手环退还成功！押金已原路退回');
    setShowReturnModal(false);
  };

  const handleReport = () => {
    toast.success('手环挂失成功');
    setShowReportModal(false);
  };

  const handleScanRFID = () => {
    setFormData({ ...formData, rfid: 'RFID' + Math.floor(Math.random() * 1000).toString().padStart(3, '0') });
    toast.info('已读取RFID');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">手环管理</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('issue')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'issue' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>发放</span>
        </button>
        <button
          onClick={() => setActiveTab('return')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'return' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>退还</span>
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'report' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>挂失</span>
        </button>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          {activeTab === 'issue' && '发放手环'}
          {activeTab === 'return' && '退还手环'}
          {activeTab === 'report' && '挂失手环'}
        </h2>
        
        {activeTab === 'issue' && (
          <div className="space-y-3">
            <button
              onClick={handleScanRFID}
              className="w-full flex items-center justify-center gap-2 p-4 bg-gray-100 rounded-lg"
            >
              <Watch className="w-6 h-6 text-purple-600" />
              <span className="font-medium">读取RFID</span>
            </button>
            
            {formData.rfid && (
              <>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">RFID编号</p>
                  <p className="font-bold text-gray-900">{formData.rfid}</p>
                </div>
                
                <input
                  type="tel"
                  placeholder="客户手机号（选填）"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={11}
                />
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">押金金额</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setFormData({ ...formData, deposit: Math.max(100, formData.deposit - 50) })}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600"
                    >-</button>
                    <span className="font-bold text-xl text-purple-600">¥{formData.deposit}</span>
                    <button
                      onClick={() => setFormData({ ...formData, deposit: formData.deposit + 50 })}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600"
                    >+</button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">预充值金额</p>
                  <div className="flex items-center gap-2 mt-1">
                    {[50, 100, 200, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setFormData({ ...formData, balance: formData.balance + amount })}
                        className="px-3 py-1 bg-white rounded-lg text-sm"
                      >+{amount}</button>
                    ))}
                  </div>
                  <p className="text-right font-bold text-purple-600 mt-2">余额: ¥{formData.balance}</p>
                </div>
                
                <Button onClick={() => setShowIssueModal(true)} className="w-full">
                  确认发放
                </Button>
              </>
            )}
          </div>
        )}

        {activeTab === 'return' && (
          <div className="space-y-3">
            <button
              onClick={handleScanRFID}
              className="w-full flex items-center justify-center gap-2 p-4 bg-gray-100 rounded-lg"
            >
              <Watch className="w-6 h-6 text-green-600" />
              <span className="font-medium">读取RFID</span>
            </button>
            
            {formData.rfid && (
              <>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">手环编号</span>
                    <span className="font-medium">{formData.rfid}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">押金</span>
                    <span className="font-medium text-green-600">¥200</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">剩余余额</span>
                    <span className="font-medium text-blue-600">¥150</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-200">
                    <span className="font-bold text-gray-900">应退金额</span>
                    <span className="font-bold text-xl text-green-600">¥350</span>
                  </div>
                </div>
                
                <Button onClick={() => setShowReturnModal(true)} className="w-full">
                  确认退还
                </Button>
              </>
            )}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                placeholder="请输入客户手机号搜索"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={11}
              />
            </div>
            
            <button
              onClick={() => {
                if (!formData.phone || formData.phone.length !== 11) {
                  toast.error('请输入正确的手机号');
                  return;
                }
                setFormData({ ...formData, rfid: 'RFID123' });
                toast.success('搜索成功');
              }}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              搜索客户
            </button>
            
            {formData.rfid && (
              <>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">手环编号</span>
                    <span className="font-medium">{formData.rfid}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">持有人</span>
                    <span className="font-medium">张三</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">手机号</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">押金</span>
                    <span className="font-medium">¥200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">剩余余额</span>
                    <span className="font-medium">¥150</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-3">
                  <p className="text-sm text-yellow-700">挂失后手环将被加入黑名单，押金可在服务台办理退还</p>
                </div>
                
                <Button onClick={() => setShowReportModal(true)} className="w-full bg-red-600 hover:bg-red-700">
                  确认挂失
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">发放中的手环 ({issuedBracelets.length})</h2>
        <div className="space-y-2">
          {issuedBracelets.map((bracelet) => (
            <div key={bracelet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Watch className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{bracelet.rfid}</p>
                  <p className="text-xs text-gray-500">{bracelet.holder}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">¥{bracelet.balance}</p>
                <p className="text-xs text-gray-500">押金 ¥{bracelet.deposit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="确认发放手环"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">RFID编号</span>
              <span className="font-medium">{formData.rfid}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">押金</span>
              <span className="font-medium text-purple-600">¥{formData.deposit}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">预充值</span>
              <span className="font-medium text-blue-600">¥{formData.balance}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold">合计收款</span>
              <span className="font-bold text-xl text-red-600">¥{formData.deposit + formData.balance}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowIssueModal(false)} variant="outline">取消</Button>
            <Button onClick={handleIssue}>确认发放</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        title="确认退还手环"
      >
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">押金退还</span>
              <span className="font-medium text-green-600">¥200</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">余额退还</span>
              <span className="font-medium text-blue-600">¥150</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-green-200">
              <span className="font-bold">应退金额</span>
              <span className="font-bold text-xl text-green-600">¥350</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">押金和余额将原路退回至客户微信账户</p>
          <div className="flex gap-2">
            <Button onClick={() => setShowReturnModal(false)} variant="outline">取消</Button>
            <Button onClick={handleReturn}>确认退还</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="确认挂失手环"
      >
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">手环编号</span>
              <span className="font-medium">{formData.rfid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">持有人</span>
              <span className="font-medium">张三</span>
            </div>
          </div>
          <p className="text-sm text-red-600">确认将此手环加入黑名单？</p>
          <div className="flex gap-2">
            <Button onClick={() => setShowReportModal(false)} variant="outline">取消</Button>
            <Button onClick={handleReport} className="bg-red-600">确认挂失</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}