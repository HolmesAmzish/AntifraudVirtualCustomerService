// sidebar.jsx
const Sidebar = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">智能反诈</h2>
      <div className="space-y-2">
        <button className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200">
          这里
        </button>
        <button className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200">
          全是
        </button>
        <button className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200">
          空的
        </button>
      </div>
    </div>
  );
};

// 在这里挂载组件
ReactDOM.createRoot(document.getElementById("side-bar")).render(<Sidebar />);
