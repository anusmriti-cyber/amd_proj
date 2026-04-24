import React from 'react';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className="animate-slide-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '20px',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexDirection: isUser ? 'row-reverse' : 'row', maxWidth: '80%' }}>
        
        {!isUser && (
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
          }}>
            🤖
          </div>
        )}

        <div style={{
          background: isUser ? 'var(--primary)' : 'var(--surface)',
          color: isUser ? '#000' : 'var(--text-main)',
          padding: '12px 16px',
          borderRadius: '16px',
          borderBottomRightRadius: isUser ? '4px' : '16px',
          borderBottomLeftRadius: !isUser ? '4px' : '16px',
          border: isUser ? 'none' : '1px solid var(--border)',
          lineHeight: 1.5,
          fontWeight: isUser ? 500 : 400
        }}>
          {message.text}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '6px', padding: isUser ? '0 4px' : '0 52px' }}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatBubble;
