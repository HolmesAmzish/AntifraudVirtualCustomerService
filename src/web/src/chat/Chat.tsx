import ChatWindow from "./ChatWindow";
import Sidebar from "../components/Sidebar";

export default function Chat() {
  return (
    <div className="flex h-full bg-gray-100 text-gray-800 h-screen">
      <div id="side-bar" className="w-1/6 bg-white border-r">
        <Sidebar />
      </div>
      <div id="chat-window" className="w-5/6 p-4">
        <ChatWindow />
      </div>
    </div>
  );
}
