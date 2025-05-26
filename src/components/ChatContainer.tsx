const handleSendMessage = async (text: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    text,
    isUser: true,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.reply || "Hmm… I didn’t quite get that.",
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong.",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  } finally {
    setIsTyping(false);
  }
};