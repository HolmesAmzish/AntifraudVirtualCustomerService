import { useState } from 'react';

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface UserDropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const UserDropdownMenu = ({ trigger, items }: UserDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
