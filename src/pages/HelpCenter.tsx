import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Code, ArrowRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter: React.FC = () => {
  const popularArticles = [
    { title: '如何快速开始使用AI报销系统', category: '入门指引' },
    { title: '发票上传与识别常见问题', category: '操作手册' },
    { title: 'API接入完整流程指南', category: 'API文档' },
    { title: '企业微信集成配置说明', category: '操作手册' },
    { title: '报销审批流程设置', category: '操作手册' }
  ];

  const categories = [
    { 
      icon: BookOpen, 
      title: '入门指引', 
      description: '新用户快速上手指南，包含注册登录、基础设置等',
      link: '/help/getting-started'
    },
    { 
      icon: FileText, 
      title: '操作手册', 
      description: '详细的功能说明和操作步骤，帮助您充分利用系统',
      link: '/help/manual'
    },
    { 
      icon: Code, 
      title: 'API接入文档', 
      description: '开发者文档，包含接口说明、SDK使用和最佳实践',
      link: '/help/api'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              帮助中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              查找文档、教程和支持资源，帮助您充分利用AI报销系统
            </p>

            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文档和教程..."
                  className="w-full pl-12 pr-4 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={category.link}
                  className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    查看详情
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              热门文章
            </h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{article.title}</h4>
                    <span className="text-sm text-gray-500">{article.category}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-primary rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              还没找到答案？
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              我们的技术支持团队随时为您提供帮助
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                联系客服
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                查看社区
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
