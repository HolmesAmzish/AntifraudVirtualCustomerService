import { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('聊天');
  
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
      <div className="mt-auto">
        <DropdownMenu />
      </div>
    </div>
  );
};
  
export default Sidebar;
