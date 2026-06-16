import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, Code, ChevronRight, Home } from 'lucide-react';

const HelpSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/help', icon: Home, label: '帮助中心首页' },
    { path: '/help/getting-started', icon: BookOpen, label: '入门指引' },
    { path: '/help/manual', icon: FileText, label: '操作手册' },
    { path: '/help/api', icon: Code, label: 'API接入文档' }
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <span className="text-lg font-bold text-gray-900">帮助中心</span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t mt-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">需要帮助？</h4>
          <p className="text-sm text-gray-600 mb-3">
            如果文档无法解决您的问题，欢迎联系我们的技术支持。
          </p>
          <button className="w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            联系支持
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSidebar;
