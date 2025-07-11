import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  streamingText?: string;
  finalText?: string;
  isStreamingComplete?: boolean;
  audioUrl?: string;
  isGeneratingAudio?: boolean;
  audioError?: string;
}

function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [useDeepThinking, setUseDeepThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateSpeech = async (message: Message) => {
    if (!message.text) return;

    console.groupCollapsed('Voice Generation Process');
    console.log('Starting speech generation for message:', message.text);
    console.log('Message text length:', message.text.length);
    console.time('VoiceGenerationTime');
    
    setMessages(prev => prev.map(msg => 
      msg === message ? {...msg, isGeneratingAudio: true, audioError: undefined} : msg
    ));

    try {
      console.log('Preparing API request to speech service');
      const requestBody = {
        input: message.text,
        response_format: "mp3",
        sample_rate: 32000,
        stream: true,
        speed: 1,
        gain: 0,
        model: "FunAudioLLM/CosyVoice2-0.5B",
        voice: "FunAudioLLM/CosyVoice2-0.5B:anna"
      };
      console.log('Request body:', requestBody);

      const startTime = Date.now();
      const response = await fetch('https://api.siliconflow.cn/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-deaxrgbwynpqdyhwdcoeegvmrvgsywmhdjxjztrcioupydzl',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('API request completed in', Date.now() - startTime, 'ms');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`语音生成失败: ${response.status} ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      console.log('Received audio data:', {
        size: arrayBuffer.byteLength + ' bytes'
      });
      
      // Create blob with explicit MIME type
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      console.log('Created audio URL:', audioUrl);

      setMessages(prev => prev.map(msg => 
        msg === message ? {
          ...msg, 
          audioUrl, 
          isGeneratingAudio: false,
          audioError: undefined
        } : msg
      ));

      // Create new audio element and play
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      console.log('Attempting to play audio');
      audio.play().catch(e => {
        console.error('Audio playback error:', e);
        setMessages(prev => prev.map(msg => 
          msg === message ? {
            ...msg,
            audioError: '播放失败: ' + e.message
          } : msg
        ));
      });
      
      console.timeEnd('VoiceGenerationTime');
      console.groupEnd();
    } catch (err) {
      const error = err as Error;
      console.error('Voice generation failed:', {
        error: error,
        message: error?.message || 'Unknown error',
        stack: error?.stack || 'No stack trace'
      });
      console.timeEnd('VoiceGenerationTime');
      console.groupEnd();
      
      setMessages(prev => prev.map(msg => 
        msg === message ? {
          ...msg, 
          isGeneratingAudio: false,
          audioError: '语音生成失败，请重试'
        } : msg
      ));
    }
  };
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('您的浏览器不支持语音识别功能');
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    audioChunksRef.current = [];
    
    // 初始化语音识别
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'zh-CN';
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setInput(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('语音识别错误:', event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      if (isRecording) {
        recognitionRef.current?.start();
      }
    };

    recognitionRef.current.start();

    // 获取麦克风权限并开始录音
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        
        mediaRecorder.start();
      })
      .catch((err) => {
        console.error('获取麦克风权限失败:', err);
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

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
      const endpoint = useDeepThinking ? "reasoner/streamChat" : "default/streamChat";
      const eventSource = new EventSource(
        `${api_url}/api/agent/${endpoint}?userInput=${encodeURIComponent(input)}`
      );
      let aiText = "";

      eventSource.onmessage = (e) => {
        console.log('Received SSE data:', e.data);
        if (e.data === "[DONE]") {
          console.log('SSE stream completed');
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.finalText = aiText;
            lastMsg.text = aiText; // 确保text字段包含完整内容
            lastMsg.isStreamingComplete = true;
            lastMsg.streamingText = "";
            return newMessages;
          });
          eventSource.close();
          return;
        }

        aiText += e.data;
        console.log('Current AI text:', aiText);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.streamingText = aiText;
          lastMsg.isStreamingComplete = false;
          return newMessages;
        });
      };

      eventSource.onerror = (e) => {
        console.error('SSE error:', e);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.finalText = aiText || "接收失败";
          lastMsg.text = aiText || "接收失败"; // 确保text字段包含完整内容
          lastMsg.isStreamingComplete = true;
          lastMsg.streamingText = "";
          return newMessages;
        });
        eventSource.close();
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
    setInput(prompt.description);
    setShowPrompts(false);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto space-y-4 px-12 py-0">
        {showPrompts && messages.length === 0 && (
          <div className="flex justify-center mb-2">
            <div className="grid grid-cols-2 gap-2 w-full max-w-xl">
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
              <div key={i} className={`text-gray-700 p-2 markdown-body ${!msg.isStreamingComplete ? 'streaming' : ''}`}>
                {msg.sender === "ai" ? (
                  <>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={msg.isStreamingComplete ? [rehypeHighlight] : []}
                    >
                      {msg.isStreamingComplete ? (msg.finalText || "") : (msg.streamingText || "")}
                    </ReactMarkdown>
                    {msg.isStreamingComplete && (
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => generateSpeech(msg)}
                          disabled={msg.isGeneratingAudio}
                          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                          <img 
                            src="/src/assets/icons/voice.svg" 
                            alt="语音播放" 
                            className="w-4 h-4 mr-1"
                          />
                          {msg.isGeneratingAudio ? '生成中...' : '语音播放'}
                        </button>
                        {msg.audioError && (
                          <span className="ml-2 text-red-500 text-sm">{msg.audioError}</span>
                        )}
                        {msg.audioUrl && (
                          <audio 
                            src={msg.audioUrl} 
                            controls 
                            className="ml-2 h-8"
                          />
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col w-full max-w-xl mx-auto my-4">
        <div className="flex border border-gray-300 rounded-2xl overflow-hidden">
          <input
            type="text"
            className="flex-1 p-2 pl-4 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={isRecording ? "正在录音..." : "输入问题..."}
          />
          <button
            onClick={handleVoiceInput}
            className={`bg-white text-black px-3 hover:bg-gray-100 transition-colors flex items-center ${
              isRecording ? 'bg-red-100' : ''
            }`}
          >
            <img 
              src="/src/assets/icons/voice.svg" 
              alt="语音输入" 
              className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`}
            />
          </button>
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
            <input 
              type="checkbox" 
              id="deep-think" 
              className="h-3 w-3" 
              checked={useDeepThinking}
              onChange={(e) => setUseDeepThinking(e.target.checked)}
            />
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
