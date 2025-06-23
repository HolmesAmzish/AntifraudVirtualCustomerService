import { useState } from 'react';
import InfoIcon from '../assets/icons/info.svg';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-auto">
      <button
        className="w-full p-2 rounded hover:bg-gray-200 bg-white flex items-center space-x-2 justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={InfoIcon} alt="更多" className="w-5 h-5" />
        <span>更多</span>
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <button className="w-full p-2 text-left hover:bg-gray-100">
            颜色主题
          </button>
          <button className="w-full p-2 text-left hover:bg-gray-100">
            关于
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
