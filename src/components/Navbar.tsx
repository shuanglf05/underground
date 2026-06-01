import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Briefcase, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">赛威报销</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              首页
            </Link>
            <Link to="/#features" className="text-gray-700 hover:text-primary transition-colors">
              功能
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">
              定价
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout) clearTimeout(closeTimeout);
                setIsHelpDropdownOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = window.setTimeout(() => {
                  setIsHelpDropdownOpen(false);
                }, 200);
                setCloseTimeout(timeout);
              }}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>帮助中心</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isHelpDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-1 w-48 bg-white rounded-lg shadow-lg border py-2 animate-fade-in"
                  onMouseEnter={() => {
                    if (closeTimeout) clearTimeout(closeTimeout);
                    setIsHelpDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    const timeout = window.setTimeout(() => {
                      setIsHelpDropdownOpen(false);
                    }, 200);
                    setCloseTimeout(timeout);
                  }}
                >
                  <Link 
                    to="/help/getting-started" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    入门指引
                  </Link>
                  <Link 
                    to="/help/manual" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    操作手册
                  </Link>
                  <Link 
                    to="/help/api" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    API文档
                  </Link>
                </div>
              )}
            </div>

            <a 
              href="https://app.ai-expense.com/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span>登录｜注册</span>
            </a>

            <Link 
              to="/partner" 
              className="flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Briefcase className="w-4 h-4" />
              <span>成为分销商</span>
            </Link>
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to="/#features" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              功能
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              定价
            </Link>
            <div className="py-2">
              <p className="text-sm text-gray-500 mb-2">帮助中心</p>
              <Link 
                to="/help/getting-started" 
                className="block py-1 pl-4 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                入门指引
              </Link>
              <Link 
                to="/help/manual" 
                className="block py-1 pl-4 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                操作手册
              </Link>
              <Link 
                to="/help/api" 
                className="block py-1 pl-4 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                API文档
              </Link>
            </div>
            <a 
              href="https://app.ai-expense.com/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block py-2 text-gray-700 hover:text-primary"
            >
              登录｜注册
            </a>
            <Link 
              to="/partner" 
              className="block mt-2 bg-gradient-primary text-white px-4 py-2 rounded-lg text-center hover:opacity-90 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              成为分销商
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
