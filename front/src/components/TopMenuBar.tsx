import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function TopMenuBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // First try to get username from localStorage
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      console.log('Loaded username from localStorage:', savedUsername);
      return;
    }

    // Fallback to token decoding
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const username = decoded.sub || decoded.username;
        localStorage.setItem('username', username);
        setUsername(username);
        console.log('Decoded username from token:', username);
      } catch (e) {
        console.error('Failed to decode token', e);
      }
    }
  }, []);

  const handleLoginSuccess = (username?: string) => {
    if (username) {
      setUsername(username);
      setIsLoginModalOpen(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const username = decoded.sub || decoded.username;
        setUsername(username);
        setIsLoginModalOpen(false);
      } catch (e) {
        console.error('Token decode error:', e);
        localStorage.removeItem('token');
      }
    }
  };

  // Check if user is logged in by validating token
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      // Basic token expiration check
      const now = Math.floor(Date.now() / 1000);
      const exp = decoded.exp;
      return exp && exp > now;
    } catch (e) {
      return false;
    }
  };

  // Prevent opening login modal if already logged in
  const handleLoginClick = () => {
    if (!isLoggedIn()) {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    console.log('User logged out - cleared token and username');
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <div className="flex items-center">
          <div className="text-lg font-semibold text-gray-800">智能金融反诈骗客服系统</div>
        </div>
        {isLoggedIn() ? (
            <button 
              className="text-gray-600 hover:text-gray-900 mr-4 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              {username}
            </button>
        ) : (
            <button 
              className="text-gray-600 hover:text-gray-900 mr-4 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              onClick={handleLoginClick}
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
