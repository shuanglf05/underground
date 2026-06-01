import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Bot, User, Send, Upload, Camera } from 'lucide-react';

const AIDemo: React.FC = () => {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([
    { role: 'ai', content: '您好！我是AI报销助手，有什么可以帮您的吗？您可以上传发票图片，或者直接告诉我您要报销的内容。' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { role: 'user' as const, content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      let aiResponse = '';
      const lowerText = inputText.toLowerCase();
      
      if (lowerText.includes('报销') || lowerText.includes('发票')) {
        aiResponse = '好的，请上传您的发票图片，我会帮您自动识别发票信息并生成报销单。您也可以直接描述您的报销内容。';
      } else if (lowerText.includes('验证') || lowerText.includes('真伪')) {
        aiResponse = '我可以帮您验证发票真伪！请上传发票图片或提供发票代码和号码，我会立即为您验证。';
      } else if (lowerText.includes('怎么') || lowerText.includes('如何')) {
        aiResponse = '使用很简单！您可以：1）上传发票图片自动识别；2）直接用自然语言描述报销内容；3）连接企业办公平台一键提交。';
      } else {
        aiResponse = '我理解了！让我为您处理这个报销申请。请您确认一下报销信息是否正确，确认后我将帮您提交审批。';
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 800);
  };

  const quickQuestions = [
    '我要报销餐费',
    '帮我验证发票',
    '如何使用？'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            体验AI报销助手
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            与AI进行真实对话，感受智能报销的便捷
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
            <div className="bg-gradient-primary px-6 py-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI报销助手</h3>
                <p className="text-white/80 text-sm">在线 · 随时为您服务</p>
              </div>
            </div>

            <div ref={messagesContainerRef} className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-slate-50 to-white">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={`px-4 py-3 rounded-2xl max-w-md ${
                        message.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-sm' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="px-3 py-1 bg-white border rounded-full text-sm text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Upload className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入您的问题..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;
