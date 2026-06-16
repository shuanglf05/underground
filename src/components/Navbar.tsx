import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=duzhiyun%20cloud%20logo%20blue%20gradient%20minimalist%20clean%20white%20background&image_size=square" 
              alt="度支云智慧报销系统"
              className="w-10 h-10 object-contain bg-white p-0.5 rounded"
            />
            <span className="text-xl font-bold text-gray-900">度支云智慧报销系统</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
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
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <a 
              href="#" 
              className="p-1.5 bg-white rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              title="AI助手"
            >
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20AI%20robot%20avatar%20blue%20purple%20headset%20cyber%20rounded%20circle%20icon%20clean%20white%20background&image_size=square" 
                alt="AI助手"
                className="w-8 h-8 object-contain"
              />
            </a>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
