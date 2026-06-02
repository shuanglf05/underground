import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const PartnerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    distributorType: '',
    hasAccount: '',
    accountPhone: '',
    name: '',
    phone: '',
    email: '',
    companyName: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <Navbar />

        <main style={{ paddingTop: '96px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
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
              <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                提交成功！
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>
                感谢您申请成为赛威报销分销商，我们的工作人员将在1-3个工作日内与您联系。
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
              onClick={() => window.location.href = '/'}>
                返回首页
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar />

      {/* 页面内容 */}
      <main style={{ paddingTop: '96px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>
          {/* 标题区域 */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              成为分销商
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              加入赛威报销分销计划，共同开拓企业报销市场，享受丰厚佣金回报
            </p>
          </div>

          {/* 表单卡片 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <form onSubmit={handleSubmit}>
              {/* 分销方式 */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                  分销方式 <span style={{ color: '#ef4444' }}>*</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="distributorType"
                      value="personal"
                      checked={formData.distributorType === 'personal'}
                      onChange={handleChange}
                      required
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '15px', color: '#374151' }}>个人名义（以个人身份成为分销商）</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="distributorType"
                      value="company"
                      checked={formData.distributorType === 'company'}
                      onChange={handleChange}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '15px', color: '#374151' }}>公司名义（以公司身份成为分销商）</span>
                  </label>
                </div>
              </div>

              {/* 账号信息 */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                  系统账号 <span style={{ color: '#ef4444' }}>*</span>
                </h3>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#374151', marginBottom: '12px' }}>是否已有赛威报销系统账号？</p>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="hasAccount"
                        value="yes"
                        checked={formData.hasAccount === 'yes'}
                        onChange={handleChange}
                        required
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '15px', color: '#374151' }}>是</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="hasAccount"
                        value="no"
                        checked={formData.hasAccount === 'no'}
                        onChange={handleChange}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '15px', color: '#374151' }}>否</span>
                    </label>
                  </div>
                </div>
                {formData.hasAccount === 'yes' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      系统账号手机号 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="accountPhone"
                      value={formData.accountPhone}
                      onChange={handleChange}
                      required={formData.hasAccount === 'yes'}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      placeholder="请输入系统账号手机号"
                    />
                  </div>
                )}
              </div>

              {/* 个人信息 */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                  联系人信息 <span style={{ color: '#ef4444' }}>*</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      姓名 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      联系电话 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      placeholder="请输入联系电话"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      电子邮箱 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      placeholder="请输入电子邮箱"
                    />
                  </div>
                </div>
              </div>

              {/* 公司信息（仅在选择公司名义时显示） */}
              {formData.distributorType === 'company' && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                    公司信息
                  </h3>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      公司名称 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={formData.distributorType === 'company'}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      placeholder="请输入公司名称"
                    />
                  </div>
                </div>
              )}

              {/* 补充说明 */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                  补充说明
                </h3>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    其他说明（选填）
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    placeholder="请描述您的优势或其他需要说明的信息..."
                  />
                </div>
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                  transition: 'opacity 0.2s'
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    提交中...
                  </span>
                ) : (
                  '提交申请'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '48px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>AI</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>赛威报销</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                智能AI对话报销系统，让报销更简单、更高效。
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>产品</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af', fontSize: '14px' }}>
                <li style={{ marginBottom: '8px' }}><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>首页</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/pricing" style={{ color: 'inherit', textDecoration: 'none' }}>定价方案</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/partner" style={{ color: 'inherit', textDecoration: 'none' }}>成为分销商</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>帮助</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af', fontSize: '14px' }}>
                <li style={{ marginBottom: '8px' }}><a href="/help/getting-started" style={{ color: 'inherit', textDecoration: 'none' }}>入门指引</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/help/manual" style={{ color: 'inherit', textDecoration: 'none' }}>操作手册</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/help/api" style={{ color: 'inherit', textDecoration: 'none' }}>API文档</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>联系我们</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af', fontSize: '14px' }}>
                <li style={{ marginBottom: '8px' }}>邮箱：suh@sawell.cn</li>
                <li style={{ marginBottom: '8px' }}>电话：028-123112</li>
                <li style={{ marginBottom: '8px' }}>地址：四川省成都市青羊区江汉路182号纺织大厦3楼</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
            <p>© 2026 四川恒信赛威科技有限公司，保留所有权利</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnerForm;
