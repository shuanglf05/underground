import React from 'react';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">免费试用14天</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            赛威报销
            <br />
            <span className="text-gradient">让报销更简单</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            用自然语言对话完成报销，支持发票验真验重，无缝集成企业微信、钉钉、飞书
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2">
              <span>立即试用</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors">
              预约演示
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>发票验真</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>自动查重</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>企业集成</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
