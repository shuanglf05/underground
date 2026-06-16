import React from 'react';
import { MessageCircle, MessageSquare, Calendar } from 'lucide-react';

const Integrations: React.FC = () => {
  const platforms = [
    {
      name: '企业微信',
      description: '深度集成企业微信，消息推送、审批同步',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      name: '钉钉',
      description: '无缝对接钉钉，自动同步组织架构',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: '飞书',
      description: '完美适配飞书生态，数据互通无忧',
      icon: Calendar,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            无缝集成您的办公平台
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            支持多种主流协同办公平台，让报销融入您的日常工作流
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {platform.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {platform.description}
                </p>
                <div className="flex items-center space-x-2 text-primary font-medium">
                  <span>了解更多</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl border p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">企业用户</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600">系统可用率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10万+</div>
              <div className="text-gray-600">月处理单量</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
