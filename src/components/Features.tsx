import React from 'react';
import { MessageSquare, Puzzle, ShieldCheck, Zap, Clock, TrendingUp } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI对话报销',
      description: '使用自然语言与AI对话，轻松完成报销流程，无需学习复杂操作。',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Puzzle,
      title: '灵活嵌入',
      description: '无缝接入企业微信、钉钉、飞书等协同办公平台，开箱即用。',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShieldCheck,
      title: '验真验重',
      description: '自动验证发票真伪，智能检测重复报销，降低财务风险。',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: '快速识别',
      description: 'OCR智能识别发票信息，自动填写报销单，准确率达99%。',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: '实时审批',
      description: '支持多级审批流程，移动端随时处理，大幅缩短报销周期。',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: '数据分析',
      description: '多维度费用分析报表，帮助企业优化成本管理。',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大功能，让报销更高效
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们的AI报销系统集成了多项智能化功能，全方位满足企业报销需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
