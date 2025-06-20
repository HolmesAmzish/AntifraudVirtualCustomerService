import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import TopMenuBar from "../components/TopMenuBar";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <TopMenuBar />
      <div className="flex flex-1 overflow-hidden">
        <div id="side-bar" className="w-1/7 bg-white border-r">
          <Sidebar />
        </div>
        <div id="chat-window" className="w-6/7 p-4">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
