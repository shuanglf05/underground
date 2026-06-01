import React from 'react';
import Navbar from '../../components/Navbar';

const ApiDoc: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar />
      
      <main style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              API文档
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              赛威报销系统API接口文档
            </p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              快速开始
            </h2>
            <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#1f2937', marginBottom: '16px' }}>
              <pre style={{ margin: 0 }}>{`// 获取API密钥
// 登录后在"设置"->"API密钥"中生成

// 基础URL
const baseURL = 'https://api.ai-expense.com/v1';

// 请求示例
const response = await fetch(baseURL + '/expenses', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`}</pre>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              报销单接口
            </h2>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                GET /api/v1/expenses - 获取报销单列表
              </h3>
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#1f2937' }}>
                <pre style={{ margin: 0 }}>{`// 请求参数
{
  page: number,      // 页码，默认1
  pageSize: number,  // 每页数量，默认20
  status?: string    // 状态筛选
}

// 响应示例
{
  code: 0,
  data: {
    list: [...],
    total: 100
  }
}`}</pre>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                POST /api/v1/expenses - 创建报销单
              </h3>
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#1f2937' }}>
                <pre style={{ margin: 0 }}>{`// 请求体
{
  title: string,        // 报销标题
  amount: number,       // 金额
  date: string,         // 日期
  category: string,     // 分类
  description?: string, // 描述
  attachments?: string[] // 附件
}

// 响应示例
{
  code: 0,
  data: {
    id: 'exp_123456'
  }
}`}</pre>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              发票接口
            </h2>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                POST /api/v1/invoices/verify - 发票验真
              </h3>
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#1f2937' }}>
                <pre style={{ margin: 0 }}>{`// 请求体
{
  invoiceCode: string,  // 发票代码
  invoiceNumber: string,// 发票号码
  invoiceDate: string,  // 开票日期
  amount?: number       // 金额（可选）
}

// 响应示例
{
  code: 0,
  data: {
    valid: true,
    invoiceInfo: {...}
  }
}`}</pre>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                POST /api/v1/invoices/ocr - OCR识别
              </h3>
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#1f2937' }}>
                <pre style={{ margin: 0 }}>{`// 请求体（multipart/form-data）
{
  file: File  // 发票图片/PDF文件
}

// 响应示例
{
  code: 0,
  data: {
    invoiceCode: '12345678',
    invoiceNumber: '98765432',
    amount: 1000.00,
    date: '2024-01-01'
  }
}`}</pre>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
              错误码说明
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>错误码</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>0</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>成功</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>400</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>请求参数错误</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>401</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>认证失败</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>403</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>权限不足</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>500</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>服务器内部错误</td>
                </tr>
              </tbody>
            </table>
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

export default ApiDoc;
