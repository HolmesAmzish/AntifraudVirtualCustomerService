// components/homepage.js
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <div id="side-bar" className="w-1/6 bg-white border-r">
        <Sidebar />
      </div>
      <div className="w-5/6 p-4 flex flex-col">
        <div className="text-white py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            智能金融反诈系统 2025
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            由cn.arorms提供的专业金融反欺诈解决方案
          </p>
          <button
            className="btn-primary inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg"
          >
            开始咨询
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">实时监测</h3>
            <p>24/7全天候监控可疑金融交易</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">智能分析</h3>
            <p>基于AI的风险评估与预警</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">专业团队</h3>
            <p>cn.arorms资深反诈专家支持</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 智能金融反诈系统 - cn.arorms 版权所有</p>
        </div>
        </div>
      </div>
    </div>
  );
}
