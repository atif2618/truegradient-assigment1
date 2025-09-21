
import React, { useState } from "react";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]); 

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = { text, from: "me", createdAt: new Date() };
    setMessages([...messages, newMessage]);
    setText("");
  };

  const handleExampleClick = (example) => {
    const newMessage = { text: example, from: "me", createdAt: new Date() };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-window">
      <div className="chat-content">
        {messages.length === 0 ? (
          <div className="welcome">
            <img
              src="https://img.favpng.com/10/19/9/ai-icon-artificial-intelligence-icon-artificial-intelligence-icon-Hjg3cdBQ.jpg"
              alt="chat logo"
              className="welcome-icon"
            />
            <h2>Welcome to Chat with AI</h2>
            <p>
              Explore ideas, solve problems, or get guidance with our AI assistant anytime
            </p>
            <div className="examples">
              <button onClick={() => handleExampleClick("Explain quantum computing in simple terms")}>
                💡 Tips for improving productivity at work
              </button>
              <button onClick={() => handleExampleClick("Write a Python function to sort a list")}>
                🍳 Share a quick and easy dinner recipe
              </button>
              <button onClick={() => handleExampleClick("What are the benefits of meditation?")}>
                🎨 Ideas for a creative weekend project
              </button>
              <button onClick={() => handleExampleClick("Help me plan a weekend trip to Paris")}>
                📚 Recommend some must-read books for personal growth
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.from}`}>
                <div className="text">{m.text}</div>
                <div className="time">{m.createdAt.toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-footer">
        <form className="composer" onSubmit={submit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button type="submit">Send</button>
        </form>
        <p className="hint">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}
