import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('聊天');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        setUsername(decoded.username);
      } catch (e) {
        console.error('Failed to decode token', e);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      setUsername(decoded.username);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
  };
  
  return (
    <div className="p-4 flex flex-col h-full shadow-md">
      <div>
        {/* 移除标题 */}
        <div className="space-y-2">
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 ${
              activeButton === '聊天' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => setActiveButton('聊天')}
          >
            聊天
          </button>
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 ${
              activeButton === '新闻' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => setActiveButton('新闻')}
          >
            新闻
          </button>
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 ${
              activeButton === '设置' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => setActiveButton('设置')}
          >
            设置
          </button>
        </div>
      </div>
      <div className="mt-auto space-y-2">
        <DropdownMenu />
        {username ? (
          <button
            className="w-full p-2 rounded hover:bg-gray-200 bg-white text-red-600"
            onClick={handleLogout}
          >
            退出登录
          </button>
        ) : (
          <button
            className="w-full p-2 rounded hover:bg-gray-200 bg-white"
            onClick={() => setIsLoginModalOpen(true)}
          >
            登录
          </button>
        )}
      </div>
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={handleLoginSuccess}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
};
  
export default Sidebar;
