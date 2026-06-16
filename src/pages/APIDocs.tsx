import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const APIDocs: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeExample = `// 初始化SDK
const client = new AIExpenseClient({
  apiKey: 'your_api_key_here',
  env: 'production'
});

// 创建报销单
const expense = await client.expense.create({
  type: 'meal',
  amount: 299,
  description: '客户招待餐费',
  invoiceIds: ['inv_001', 'inv_002']
});

console.log(expense.id);`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/help"
              className="inline-flex items-center text-gray-600 hover:text-primary mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回帮助中心
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">API接入文档</h1>
            <p className="text-lg text-gray-600">
              开发者文档，包含接口说明、SDK使用和最佳实践
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">快速开始</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. 获取API Key</h3>
              <p className="text-gray-700 mb-4">
                登录AI报销系统，进入开发者设置，创建应用并获取API Key。
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. 安装SDK</h3>
              <div className="relative">
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                  npm install @ai-expense/sdk
                </div>
                <button
                  onClick={() => copyToClipboard('npm install @ai-expense/sdk', 'npm')}
                  className="absolute top-3 right-3 p-2 hover:bg-gray-700 rounded"
                >
                  {copied === 'npm' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3. 代码示例</h3>
              <div className="relative">
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{codeExample}</pre>
                </div>
                <button
                  onClick={() => copyToClipboard(codeExample, 'code')}
                  className="absolute top-3 right-3 p-2 hover:bg-gray-700 rounded"
                >
                  {copied === 'code' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold text-gray-900 mb-4">API接口</h2>

              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-green-50 px-4 py-3 border-b flex items-center space-x-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                    <span className="font-mono text-sm">/api/v1/expense/create</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">创建报销单</h4>
                    <p className="text-sm text-gray-600">创建新的报销申请</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 px-4 py-3 border-b flex items-center space-x-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">GET</span>
                    <span className="font-mono text-sm">/api/v1/expense/:id</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">获取报销单详情</h4>
                    <p className="text-sm text-gray-600">根据ID查询报销单信息</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-green-50 px-4 py-3 border-b flex items-center space-x-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                    <span className="font-mono text-sm">/api/v1/invoice/verify</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">发票验真</h4>
                    <p className="text-sm text-gray-600">验证发票真伪并获取发票信息</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/help/manual"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              操作手册
            </Link>
            <Link
              to="/help"
              className="flex items-center text-primary hover:text-primary/80"
            >
              帮助中心
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIDocs;
