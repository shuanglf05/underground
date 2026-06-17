import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Phone, Mail, MessageCircle, FileText } from 'lucide-react';

export default function CounterHelp() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '如何办理手环挂失？',
      answer: '在手环管理页面，选择挂失标签，输入客户手机号搜索，找到对应手环后点击确认挂失即可。挂失后手环将被加入黑名单，押金可在服务台办理退还。',
    },
    {
      question: '门票退票政策是什么？',
      answer: '未使用门票可在有效期内申请退票，收取10%手续费。已使用门票不支持退票。退款将在3-7个工作日内原路退回。',
    },
    {
      question: '如何进行交接班？',
      answer: '在首页右上角点击交接班按钮，确认当前班次数据后完成交接。系统会自动记录交接班时间和人员信息。',
    },
    {
      question: '手环余额不足怎么办？',
      answer: '可在吧台为客户手环进行充值，支持微信、支付宝和现金支付。充值金额不限，余额可随时退还。',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/counter/profile')} className="text-white/80">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">帮助中心</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-2 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-4">常见问题</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                {faq.question}
              </h4>
              <p className="text-sm text-gray-500 mt-2 pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-4">联系我们</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">服务热线</p>
              <p className="font-medium text-gray-900">400-888-8888</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">电子邮箱</p>
              <p className="font-medium text-gray-900">service@lanyuecheng.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">在线客服</p>
              <p className="font-medium text-gray-900">工作时间：9:00-21:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-3">操作手册</h3>
        <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">吧台端操作指南</span>
        </button>
      </div>
    </div>
  );
}