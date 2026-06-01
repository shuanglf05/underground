import React from 'react';
import Navbar from '../../components/Navbar';

const GettingStarted: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar />
      
      <main style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              入门指引
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              快速了解赛威报销系统的基本使用
            </p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              第一步：注册账号
            </h2>
            <ol style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}>点击右上角的"登录｜注册"按钮</li>
              <li style={{ marginBottom: '12px' }}>填写您的企业信息和联系方式</li>
              <li style={{ marginBottom: '12px' }}>验证您的邮箱地址</li>
              <li>完成注册，开始使用</li>
            </ol>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              第二步：创建第一个报销单
            </h2>
            <ol style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}>登录后进入报销系统</li>
              <li style={{ marginBottom: '12px' }}>点击"新建报销"按钮</li>
              <li style={{ marginBottom: '12px' }}>填写报销基本信息（日期、事由、金额等）</li>
              <li style={{ marginBottom: '12px' }}>上传发票或消费凭证</li>
              <li>提交审批</li>
            </ol>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              第三步：使用AI对话
            </h2>
            <ol style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}>点击页面右下角的AI助手图标</li>
              <li style={{ marginBottom: '12px' }}>用自然语言描述您的报销需求</li>
              <li style={{ marginBottom: '12px' }}>AI会自动识别并填写相关信息</li>
              <li>确认信息无误后提交</li>
            </ol>
          </div>
        </div>
      </main>

      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '48px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
            © 2024 赛威报销. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GettingStarted;
