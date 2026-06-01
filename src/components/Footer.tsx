import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold">报销系统</span>
            </div>
            <p className="text-gray-400 text-sm">
              智能AI对话报销系统，让报销更简单、更高效。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">产品</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">定价方案</Link></li>
              <li><Link to="/partner" className="hover:text-white transition-colors">成为分销商</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">帮助</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/help/getting-started" className="hover:text-white transition-colors">入门指引</Link></li>
              <li><Link to="/help/manual" className="hover:text-white transition-colors">操作手册</Link></li>
              <li><Link to="/help/api" className="hover:text-white transition-colors">API文档</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>邮箱：contact@ai-expense.com</li>
              <li>电话：400-888-8888</li>
              <li>地址：北京市朝阳区科技园区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 AI报销系统. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
