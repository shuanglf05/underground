import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GettingStarted: React.FC = () => {
  const steps = [
    {
      title: '1. 注册账号',
      content: '访问AI报销系统官网，点击右上角"注册"按钮，填写企业信息和管理员账号即可登录。'
    },
    {
      title: '2. 企业认证',
      content: '登录后进入企业设置，上传企业营业执照和相关资质，完成企业认证。认证通过后可解锁全部功能。'
    },
    {
      title: '3. 组织架构设置',
      content: '添加部门信息和员工账号，可以通过Excel批量导入，或连接企业微信/钉钉/飞书自动同步组织架构。'
    },
    {
      title: '4. 配置审批流程',
      content: '根据企业需求设置多级审批流程，支持按金额、部门、费用类型等条件设置不同的审批人。'
    },
    {
      title: '5. 开始使用',
      content: '配置完成后，员工即可开始使用AI报销功能。可以通过网页端、移动端或嵌入企业办公平台使用。'
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">入门指引</h1>
            <p className="text-lg text-gray-600">
              新用户快速上手指南，5分钟开始使用AI报销系统
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border mb-8">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mx-auto mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">快速开始提示</h3>
                <p className="text-green-700">
                  如果您想快速体验，可以先跳过企业认证，使用演示模式熟悉各项功能。
                  准备好后再完成正式配置。
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/help"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              帮助中心
            </Link>
            <Link
              to="/help/manual"
              className="flex items-center text-primary hover:text-primary/80"
            >
              操作手册
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GettingStarted;
