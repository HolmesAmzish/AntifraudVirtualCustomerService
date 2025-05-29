const { useState } = React;

function ChatApp() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: 'user', text: input }]);

        try {
            const res = await fetch(`/chat?userInput=${encodeURIComponent(input)}`);
            const text = await res.text();
            setMessages(prev => [...prev, { sender: 'ai', text }]);
        } catch (e) {
            setMessages(prev => [...prev, { sender: 'ai', text: 'Error: ' + e.message }]);
        }

        setInput('');
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4 text-center">AI Chat</h1>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 border p-3 rounded h-96 bg-gray-50">
                {messages.map((msg, i) => (
                    <div key={i} className={`p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded-l"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ChatApp />);