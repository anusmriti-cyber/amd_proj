import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', width: '100%' }}>
      <input
        type="text"
        className="glass-input"
        placeholder="Ask me anything about your nutrition..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        style={{ flex: 1 }}
      />
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={!text.trim() || disabled}
        style={{ padding: '0 24px' }}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
