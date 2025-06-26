import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import InformationIcon from '../assets/icons/information.svg';
import FindIcon from '../assets/icons/find.svg';
import SettingIcon from '../assets/icons/setting.svg';

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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
  };

  const handleNavigation = (page: string) => {
    setActiveButton(page);
    if (page === '聊天') {
      navigate('/chat');
    } else if (page === '新闻') {
      navigate('/news');
    } else if (page === '设置') {
      navigate('/settings');
    }
  };
  
  return (
    <div className="p-4 flex flex-col h-full shadow-md">
      <div>
        {/* 移除标题 */}
        <div className="space-y-2">
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 flex items-center space-x-2 ${
              activeButton === '聊天' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => handleNavigation('聊天')}
          >
            <img src={InformationIcon} alt="聊天" className="w-5 h-5" />
            <span>聊天</span>
          </button>
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 flex items-center space-x-2 ${
              activeButton === '新闻' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => handleNavigation('新闻')}
          >
            <img src={FindIcon} alt="新闻" className="w-5 h-5" />
            <span>新闻</span>
          </button>
          <button 
            className={`w-full p-2 rounded hover:bg-gray-200 flex items-center space-x-2 ${
              activeButton === '设置' ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => handleNavigation('设置')}
          >
            <img src={SettingIcon} alt="设置" className="w-5 h-5" />
            <span>设置</span>
          </button>
        </div>
      </div>
      <div className="mt-auto space-y-2">
        <DropdownMenu />
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
