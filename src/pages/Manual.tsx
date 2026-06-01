import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, FileText, Upload, MessageSquare, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Manual: React.FC = () => {
  const sections = [
    {
      title: '发票管理',
      icon: FileText,
      items: [
        '上传发票',
        '发票识别',
        '发票验真',
        '发票查重',
        '发票归档'
      ]
    },
    {
      title: '报销流程',
      icon: Upload,
      items: [
        '创建报销单',
        'AI对话报销',
        '提交审批',
        '审批处理',
        '财务支付'
      ]
    },
    {
      title: '系统设置',
      icon: MessageSquare,
      items: [
        '组织架构',
        '审批流程',
        '费用类型',
        '集成设置',
        '权限管理'
      ]
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">操作手册</h1>
            <p className="text-lg text-gray-600">
              详细的功能说明和操作步骤，帮助您充分利用系统
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">目录</h2>

              {sections.map((section, sectionIndex) => {
                const IconComponent = section.icon;
                return (
                  <div key={sectionIndex} className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 ml-11">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <hr className="my-8" />

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                使用AI对话报销
              </h2>
              <p className="text-gray-700 mb-4">
                AI对话报销是我们系统最具特色的功能，您可以通过自然语言对话完成整个报销流程。
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                <li>打开AI报销助手对话框</li>
                <li>用自然语言描述您的报销需求，如"我要报销昨天的餐费"</li>
                <li>上传发票图片或拍照</li>
                <li>AI自动识别并填写报销信息</li>
                <li>确认信息无误后提交</li>
              </ol>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>提示：</strong>您可以说"帮我把这些发票都报销了"，
                  AI会自动处理多张发票并生成报销单。
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/help/getting-started"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              入门指引
            </Link>
            <Link
              to="/help/api"
              className="flex items-center text-primary hover:text-primary/80"
            >
              API文档
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Manual;
