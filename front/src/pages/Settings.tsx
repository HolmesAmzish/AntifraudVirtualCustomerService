import { useState } from 'react';
import Sidebar from "../components/Sidebar";
import TopMenuBar from "../components/TopMenuBar";

export default function Settings() {
  const [pdfFiles, setPdfFiles] = useState<string[]>([]);

  const handleAddPdf = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const newFiles = Array.from(files).map(file => file.name);
        setPdfFiles([...pdfFiles, ...newFiles]);
      }
    };
    input.click();
  };
  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <TopMenuBar />
      <div className="flex flex-1 overflow-hidden">
        <div id="side-bar" className="w-1/7 bg-white border-r">
          <Sidebar />
        </div>
        <div id="settings-content" className="w-6/7 p-4">
          {/* MCP Settings and PDF Upload sections will go here */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">设置</h1>
            
            {/* MCP Settings Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">MCP配置</h2>
              <textarea
                className="w-full h-64 p-2 font-mono text-sm border rounded"
                placeholder="Enter MCP configuration in JSON format..."
              />
            </div>

            {/* PDF Upload Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">PDF文档</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Add PDF Card */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={handleAddPdf}
                >
                  <div className="text-4xl text-gray-400">+</div>
                  <div className="mt-2 text-gray-500">添加PDF</div>
                </div>

                {/* PDF Thumbnails */}
                {pdfFiles.map((file, index) => (
                  <div key={index} className="border rounded-lg p-4 flex items-center justify-center">
                    <span className="text-sm truncate">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
