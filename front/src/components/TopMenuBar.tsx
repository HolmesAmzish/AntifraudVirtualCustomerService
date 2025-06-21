import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function TopMenuBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get username (simplified example)
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
    <>
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <div className="flex items-center">
          <div className="text-lg font-semibold text-gray-800">智能金融反诈骗客服系统</div>
        </div>
        {username ? (
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">{username}</span>
            <button 
              className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              退出
            </button>
          </div>
        ) : (
          <button 
            className="text-gray-600 hover:text-gray-900 mr-4 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
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
    </>
  );
}

export default TopMenuBar;
