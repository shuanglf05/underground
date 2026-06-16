import React from 'react';
import Navbar from '../../components/Navbar';

const Manual: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar />
      
      <main style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              操作手册
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              赛威报销系统详细操作指南
            </p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              报销单管理
            </h2>
            <ul style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong>创建报销单：</strong>支持多种类型报销（差旅、餐饮、办公用品等）</li>
              <li style={{ marginBottom: '12px' }}><strong>编辑报销单：</strong>草稿状态的报销单可随时修改</li>
              <li style={{ marginBottom: '12px' }}><strong>删除报销单：</strong>未提交的报销单可删除</li>
              <li style={{ marginBottom: '12px' }}><strong>查看历史：</strong>所有历史报销单随时可查</li>
              <li><strong>导出报表：</strong>支持Excel/PDF格式导出</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              发票管理
            </h2>
            <ul style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong>发票上传：</strong>支持图片、PDF、电子发票等多种格式</li>
              <li style={{ marginBottom: '12px' }}><strong>发票验真：</strong>自动验证发票真伪，防止假票报销</li>
              <li style={{ marginBottom: '12px' }}><strong>重复检测：</strong>智能识别重复发票，避免重复报销</li>
              <li style={{ marginBottom: '12px' }}><strong>OCR识别：</strong>自动提取发票关键信息</li>
              <li><strong>发票归档：</strong>自动分类归档，便于管理</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              审批流程
            </h2>
            <ul style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong>多级审批：</strong>支持自定义审批层级</li>
              <li style={{ marginBottom: '12px' }}><strong>审批通知：</strong>实时推送审批状态通知</li>
              <li style={{ marginBottom: '12px' }}><strong>审批意见：</strong>支持添加审批意见和备注</li>
              <li style={{ marginBottom: '12px' }}><strong>批量审批：</strong>支持批量处理审批任务</li>
              <li><strong>审批历史：</strong>完整的审批记录可追溯</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              系统设置
            </h2>
            <ul style={{ color: '#374151', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong>用户管理：</strong>添加、编辑、禁用用户账号</li>
              <li style={{ marginBottom: '12px' }}><strong>权限设置：</strong>为不同角色分配不同权限</li>
              <li style={{ marginBottom: '12px' }}><strong>科目设置：</strong>自定义报销科目和分类</li>
              <li style={{ marginBottom: '12px' }}><strong>审批流程：</strong>配置审批节点和规则</li>
              <li><strong>集成设置：</strong>配置企业微信、钉钉、飞书等集成</li>
            </ul>
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

export default Manual;
