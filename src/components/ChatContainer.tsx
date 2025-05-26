import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm Nova. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `You said: "${newMessage.text}". I'm still learning, but I'm here for you.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.isUser ? 'right' : 'left', marginBottom: '0.5rem' }}>
            <strong>{msg.isUser ? 'You' : 'Nova'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '0.5rem' }}>Send</button>
      </div>
    </div>
  );
};