
import React, { useState } from "react";
import ParentSidebar from "../../components/ParentSidebar";
import "./parentchatbot.css";

const suggestions = [
  "How can I track my child's progress?",
  "How can I support daily learning goals?",
  "Where can I find learning activities?",
  "How does the reward system work?",
];

function ParentChatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I'm your Cerevolt Parent Assistant. I can help you navigate the platform and understand its learning features. What would you like to know?",
    },
  ]);

  const sendMessage = (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: trimmedMessage },
      {
        sender: "assistant",
        text: "Thanks for your question! The Parent Assistant is currently running in demo mode. AI-powered responses will be available once the assistant API is connected.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="parent-layout">
      <ParentSidebar />

      <main className="parent-main parent-assistant-main">
        <header className="parent-topbar">
          <div>
            <p className="parent-breadcrumb">PARENT PORTAL / PARENT ASSISTANT</p>
            <h1>Parent Assistant</h1>
            <p className="parent-subtitle">
              Your helpful companion for navigating Cerevolt.
            </p>
          </div>
        </header>

        <section className="assistant-welcome">
          <div>
            <span>YOUR DIGITAL COMPANION</span>
            <h2>How can I help you today?</h2>
            <p>
              Ask questions about your child's learning journey, platform
              features, goals, activities, and rewards.
            </p>
          </div>
          <div className="assistant-welcome-icon">✦</div>
        </section>

        <section className="assistant-chat-card">
          <div className="assistant-chat-header">
            <div className="assistant-avatar">C</div>
            <div>
              <h3>Cerevolt Assistant</h3>
              <span>Demo mode · AI integration pending</span>
            </div>
            <div className="assistant-status">
              <span></span> Available
            </div>
          </div>

          <div className="assistant-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`assistant-message-row ${item.sender}`}
              >
                {item.sender === "assistant" && (
                  <div className="assistant-message-avatar">C</div>
                )}
                <div className="assistant-message-bubble">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="assistant-suggestions">
            <p>Suggested questions</p>
            <div>
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form
            className="assistant-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Type your question here..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" disabled={!message.trim()}>
              Send <span>➤</span>
            </button>
          </form>
        </section>

        <p className="assistant-disclaimer">
          This is a demonstration interface. Real AI-generated responses
          will be available after API integration.
        </p>

        <footer className="parent-dashboard-footer">
          Cerevolt Parent Portal · Supporting every learning journey
        </footer>
      </main>
    </div>
  );
}

export default ParentChatbot;
