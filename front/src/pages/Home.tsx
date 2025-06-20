import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-12 text-center p-6">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            智能金融反诈系统
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            由cn.arorms提供的专业金融反欺诈解决方案
          </p>
        </div>
        
        <div className="pt-8">
          <button 
            onClick={() => navigate('/chat')}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            开始咨询
          </button>
        </div>
      </div>
    </div>
  );
}