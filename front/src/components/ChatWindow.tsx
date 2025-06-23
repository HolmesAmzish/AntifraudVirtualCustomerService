import React, { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  completeText?: string;
  streamingText?: string;
  streamingOpacity?: number;
}

function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    console.log('Sending user message:', userMessage); // 添加调试日志
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input immediately

    try {
      // Create a new AI message with empty text
      const aiMessage: Message = { sender: "ai", text: "" };
      setMessages((prev) => [...prev, aiMessage]);

      // Use EventSource for streaming response
      const api_url = import.meta.env.VITE_API_URL
      const eventSource = new EventSource(
        `${api_url}/api/agent/streamChat?userInput=${encodeURIComponent(input)}`
      );
      let aiText = "";

      eventSource.onmessage = (e) => {
        console.log('Received SSE data:', e.data); // 添加调试日志
        if (e.data === "[DONE]") {
          console.log('SSE stream completed');
          eventSource.close();
          return;
        }

        aiText += e.data;
        console.log('Current AI text:', aiText); // 添加调试日志
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];

          // Keep last 5 characters as streaming text
          const streamingLength = Math.min(5, aiText.length);
          lastMsg.streamingText = aiText.slice(-streamingLength);
          lastMsg.completeText = aiText.slice(0, -streamingLength);
          lastMsg.streamingOpacity = 0.2; // Stronger fade effect

          return newMessages;
        });
      };

      eventSource.onerror = (e) => {
        console.error('SSE error:', e);
        eventSource.close();
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.completeText = aiText || "接收失败";
          lastMsg.streamingText = "";
          lastMsg.streamingOpacity = 1;
          return newMessages;
        });
      };
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: " + (e as Error).message } as Message,
      ]);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const [showPrompts, setShowPrompts] = useState(true);
  const prompts = [
    {
      title: "最新诈骗案例",
      description: "了解近期发生的典型金融诈骗手法和案例"
    },
    {
      title: "防范指南", 
      description: "学习如何识别和防范各类金融诈骗行为"
    },
    {
      title: "法律解读",
      description: "获取反洗钱和反诈骗相关法律法规解读"
    },
    {
      title: "诈骗特征",
      description: "掌握金融诈骗的常见特征和识别方法"
    }
  ];

  const handlePromptClick = (prompt: {title: string, description: string}) => {
    setInput(prompt.title);
    setShowPrompts(false);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
        {showPrompts && messages.length === 0 && (
          <div className="flex justify-center mb-2">
            <div className="grid grid-cols-2 gap-2 w-full max-w-2xl">
              {prompts.map((prompt, i) => (
                <div 
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="cursor-pointer bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-colors"
                >
                  <div className="font-medium text-green-800">{prompt.title}</div>
                  <div className="text-sm text-emerald-600 mt-1">{prompt.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) =>
          msg.sender === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-xs lg:max-w-md bg-blue-500 text-white p-3 rounded-lg rounded-tr-none shadow">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="text-gray-700 p-2 whitespace-pre-wrap">
              {msg.sender === "ai" ? (
                <>
                  <span className="complete-text">
                    {msg.completeText || ""}
                  </span>
                  <span
                    className="streaming-text"
                    style={{ opacity: msg.streamingOpacity || 1 }}
                  >
                    {msg.streamingText || ""}
                  </span>
                </>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col w-full max-w-2xl mx-auto my-4">
        <div className="flex border border-gray-300 rounded-2xl overflow-hidden">
          <input
            type="text"
            className="flex-1 p-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="   输入问题..."
          />
          <button
            onClick={sendMessage}
            className="bg-white text-black px-6 hover:bg-gray-100 transition-colors"
          >
            发送
          </button>
        </div>
        <div className="flex justify-between mt-2 px-2 text-sm">
          <select className="border-0 bg-transparent text-gray-500 focus:outline-none">
            <option>Qwen3-Antifraud</option>
            <option>Deepseek-V3</option>
          </select>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="deep-think" className="h-3 w-3" />
            <label htmlFor="deep-think" className="text-gray-500">深度思考</label>
            <input type="checkbox" id="web-search" className="h-3 w-3" />
            <label htmlFor="web-search" className="text-gray-500">网页搜索</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
