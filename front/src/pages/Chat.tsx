import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function Chat() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <div id="side-bar" className="w-1/6 bg-white border-r">
        <Sidebar />
      </div>
      <div id="chat-window" className="w-5/6 p-4">
        <ChatWindow />
      </div>
    </div>
  );
}