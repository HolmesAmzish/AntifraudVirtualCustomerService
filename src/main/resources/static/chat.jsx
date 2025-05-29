const { useState, useRef, useEffect } = React;

function ChatApp() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput(''); // Clear input immediately

        try {
            // Create a new AI message with empty text
            const aiMessage = { sender: 'ai', text: '' };
            setMessages(prev => [...prev, aiMessage]);
            
            // Use EventSource for streaming response
            const eventSource = new EventSource(`/chat/stream?userInput=${encodeURIComponent(input)}`);
            let aiText = '';
            
            eventSource.onmessage = (e) => {
                if (e.data === '[DONE]') {
                    eventSource.close();
                    return;
                }
                
                aiText += e.data;
                setMessages(prev => {
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

            eventSource.onerror = () => {
                eventSource.close();
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    lastMsg.completeText = aiText || '接收失败';
                    lastMsg.streamingText = '';
                    lastMsg.streamingOpacity = 1;
                    return newMessages;
                });
            };
        } catch (e) {
            setMessages(prev => [...prev, { sender: 'ai', text: 'Error: ' + e.message }]);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((msg, i) => (
                    msg.sender === 'user' ? (
                        <div key={i} className="flex justify-end">
                            <div className="max-w-xs lg:max-w-md bg-blue-500 text-white p-3 rounded-lg rounded-tr-none shadow">
                                {msg.text}
                            </div>
                        </div>
                    ) : (
                        <div key={i} className="text-gray-700 p-2 whitespace-pre-wrap">
                {msg.sender === 'ai' ? (
                    <>
                        <span className="complete-text">
                            {msg.completeText || ''}
                        </span>
                        <span className="streaming-text" style={{opacity: msg.streamingOpacity || 1}}>
                            {msg.streamingText || ''}
                        </span>
                    </>
                ) : (
                    <span>{msg.text}</span>
                )}
            </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded-l"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="输入问题..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">发送</button>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('chat-window')).render(<ChatApp />);
