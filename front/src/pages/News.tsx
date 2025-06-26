import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Card from 'antd/es/card';
import Typography from 'antd/es/typography';
const { Title } = Typography;
import axios from 'axios';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createTime: string;
}

export default function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      const response = await axios.get<{
        list: NewsItem[];
        total: number;
      }>(`/api/news/getAll?pageNum=${currentPage}&pageSize=${pageSize}`);
      setNewsList(response.data.list);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  return (
    <div className="p-4">
      <Title level={2} className="mb-4">新闻中心</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsList.map(news => (
          <Card 
            key={news.id}
            title={news.title}
            bordered={false}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-600">{news.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(news.createTime).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={(page: number) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
