import React, { useState } from 'react';
import { generateAnswer } from '../../services/api';
import { EventEmitter } from 'events';
import './coding_chatbot_styles.css'; // External styles

export const codeHelperEvents = new EventEmitter();

function CodingChatBot() {
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleChat = () => {
    setChatHistory([]);
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    const userMessage = { type: 'user', text: instruction };
    setChatHistory((prev) => [...prev, userMessage]);
    setInstruction('');
    setLoading(true);
    setError('');

    try {
      const answer = await generateAnswer(userMessage.text);
      const botMessage = { type: 'bot', text: answer };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (err) {
      setError('⚠️ Failed to get response.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      {open ? (
        <div className="chat-window">
          <div className="chat-header">
            <h4>💬 Code Assistant </h4>
            <button className="close-btn" onClick={toggleChat}>−</button>
          </div>

          <div className="chat-body">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`msg ${msg.type}`}>
                {msg.type === 'bot' ? <pre>{msg.text}</pre> : <p>{msg.text}</p>}
              </div>
            ))}
            {loading && <div className="msg bot"><p><span className="spinner"></span> Generating...</p></div>}
          </div>

          <form className="chat-footer" onSubmit={handleSubmit}>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ask something..."
              rows={2} />
            <button type="submit" disabled={loading}>Send</button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <button className="chat-toggle" onClick={toggleChat}>
          💬
        </button>
      )}
    </div>
  );
}

export default CodingChatBot;
