import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  verdict: string;
  significance: string;
}

export default function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/news/getAll');
      console.log('News API response:', response);
      if (!response.data || response.data.length === 0) {
        setError('没有新闻数据');
      } else {
        setNewsList(response.data);
        setError('');
      }
    } catch (error: unknown) {
      console.error('Failed to fetch news:', error);
      let errorMessage = '获取新闻数据失败';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">新闻中心</h2>
        
        {loading && <div className="text-center py-8">加载中...</div>}
        {error && <div className="text-red-500 text-center py-8">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map(news => (
            <div 
              key={news.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{news.summary}</p>
              <p className="text-sm text-gray-400">
                {new Date(news.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
