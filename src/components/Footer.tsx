import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    hasAccount: '',
    accountPhone: '',
    name: '',
    phone: '',
    companyName: '',
    message: ''
  });
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);
  const [isPartnerSubmitted, setIsPartnerSubmitted] = useState(false);

  const handlePartnerFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnerFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPartnerSubmitting(true);
    setTimeout(() => {
      setIsPartnerSubmitting(false);
      setIsPartnerSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=duzhiyun%20cloud%20logo%20blue%20gradient%20minimalist%20clean%20white%20background&image_size=square" 
                  alt="度支云智慧报销系统"
                  className="w-10 h-10 object-contain bg-white p-0.5 rounded"
                />
                <span className="text-xl font-bold">度支云智慧报销系统</span>
              </div>
              <p className="text-gray-400 text-sm">
                全流程自动收票填单、智能审单控风险，财务少录单少查票、员工免贴票免手工填报，双向大幅省时降差错。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">定价方案</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">帮助</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/help/getting-started" className="hover:text-white transition-colors">入门指引</Link></li>
                <li><Link to="/help/manual" className="hover:text-white transition-colors">操作手册</Link></li>
                <li><Link to="/help/api" className="hover:text-white transition-colors">API文档</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
                <li><button onClick={() => setShowPartnerModal(true)} className="text-left hover:text-white transition-colors bg-transparent border-none cursor-pointer">成为分销商</button></li>
              </ul>
            </div>

          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <div className="flex items-start space-x-3 mb-4">
              <img 
                src="http://saiwei-expense-invoice.oss-cn-hangzhou.aliyuncs.com/attachments/10/91510700-8ced-498b-8399-e3d480cfcb6f.png?Expires=1780650028&OSSAccessKeyId=LTAI5t5m5n8SFTTc9vGn4BMG&Signature=xDrYXWmM1o%2B8Pe2kuXradky9DQY%3D" 
                alt="联系人"
                className="w-14 h-18 object-cover rounded-lg flex-shrink-0 border-2 border-gray-700"
              />
              <div>
                <p className="text-white font-medium">苏恒</p>
                <p className="text-gray-400 text-sm">四川恒信赛威科技有限公司</p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>电话：028-123112</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 四川恒信赛威科技有限公司旗下产品</p>
          <p>蜀ICP备2023020652号-1</p>
        </div>
      </div>
    </footer>

      {/* 成为分销商弹窗 */}
      {showPartnerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowPartnerModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#6b7280'
            }} onClick={() => { setShowPartnerModal(false); setIsPartnerSubmitted(false); }}>
              ×
            </button>

            {isPartnerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <span style={{ fontSize: '48px' }}>✓</span>
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                  提交成功！
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>
                  感谢您申请成为度支云智慧报销系统分销商，我们的工作人员将在1-3个工作日内与您联系。
                </p>
                <button style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => { setShowPartnerModal(false); setIsPartnerSubmitted(false); }}>
                  确定
                </button>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '28px'
                  }}>
                    🤝
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                    成为分销商
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    加入度支云智慧报销系统分销计划，共同开拓企业报销市场
                  </p>
                </div>

                <form onSubmit={handlePartnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      分销主体<span style={{ color: '#ef4444' }}>*</span>
                    </h4>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasAccount"
                          value="yes"
                          checked={partnerFormData.hasAccount === 'yes'}
                          onChange={handlePartnerFormChange}
                          required
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '15px', color: '#374151' }}>个人</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasAccount"
                          value="no"
                          checked={partnerFormData.hasAccount === 'no'}
                          onChange={handlePartnerFormChange}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '15px', color: '#374151' }}>公司</span>
                      </label>
                    </div>
                    {partnerFormData.hasAccount === 'yes' && (
                      <div style={{ marginTop: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          系统账号手机号 <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="accountPhone"
                          value={partnerFormData.accountPhone}
                          onChange={handlePartnerFormChange}
                          required={partnerFormData.hasAccount === 'yes'}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          placeholder="请输入系统账号手机号"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      联系人信息 <span style={{ color: '#ef4444' }}>*</span>
                    </h4>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        姓名 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={partnerFormData.name}
                        onChange={handlePartnerFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        联系电话 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={partnerFormData.phone}
                        onChange={handlePartnerFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPartnerSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: isPartnerSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {isPartnerSubmitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        提交中...
                      </span>
                    ) : (
                      '提交申请'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
