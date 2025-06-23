import { useState } from 'react';
import axios from 'axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onSwitchToRegister }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await axios.post(api_url + '/api/auth/login', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const token = response.headers['authorization'].split(' ')[1];
        localStorage.setItem('token', token);
        
        // Decode and save username
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const username = decoded.sub || decoded.username;
        localStorage.setItem('username', username);
        
        console.log('Login successful - Token:', token);
        console.log('Username:', username);
        
        // Pass username to parent component
        onLoginSuccess(username);
        onClose();
      }
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Single modal container with backdrop blur */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-10000 ${isOpen ? 'backdrop-blur-sm bg-black/30' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">用户登录</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? '登录中...' : '登录'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              没有账号？注册
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
