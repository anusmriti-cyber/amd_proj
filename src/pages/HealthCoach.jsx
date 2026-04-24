import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/AIChat/ChatBubble';
import ChatInput from '../components/AIChat/ChatInput';
import { storage } from '../services/storage';
import { generateCoachResponse } from '../services/aiEngine';
import { generateId } from '../utils/helpers';

const HealthCoach = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load history
    const history = storage.getChatHistory();
    if (history.length === 0) {
      // Initial greeting
      handleAIResponse("greeting");
    } else {
      setMessages(history);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAIResponse = (promptType) => {
    setIsTyping(true);
    
    // Simulate network/thinking delay
    setTimeout(() => {
      const responseText = generateCoachResponse(promptType);
      
      const newMsg = {
        id: generateId(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => {
        const updated = [...prev, newMsg];
        storage.set('chat_history', updated.slice(-50)); // Keep last 50
        return updated;
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSend = (text) => {
    const newMsg = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => {
      const updated = [...prev, newMsg];
      storage.set('chat_history', updated.slice(-50));
      return updated;
    });

    handleAIResponse('general');
  };

  const handleQuickPrompt = (prompt) => {
    handleSend(prompt);
  };

  const quickPrompts = [
    "How am I doing today?",
    "Suggest a healthy snack",
    "Am I hitting my protein goal?",
    "I'm feeling hungry"
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>AI Health Coach</h1>
        <p className="text-muted">Personalized advice based on your daily data.</p>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
        
        {/* Chat Area */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {messages.map((msg, i) => (
            <div key={msg.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ChatBubble message={msg} />
            </div>
          ))}
          
          {isTyping && (
            <div className="animate-fade-in" style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🤖
              </div>
              <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '16px', borderBottomLeftRadius: '4px', display: 'flex', gap: '4px' }}>
                <div className="animate-pulse" style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0s' }} />
                <div className="animate-pulse" style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0.2s' }} />
                <div className="animate-pulse" style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div style={{ padding: '0 24px 16px 24px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          {quickPrompts.map((p, i) => (
            <button 
              key={i} 
              className="chip" 
              onClick={() => handleQuickPrompt(p)}
              disabled={isTyping}
              style={{ whiteSpace: 'nowrap', opacity: isTyping ? 0.5 : 1 }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px 24px 24px' }}>
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>

      </div>
    </div>
  );
};

export default HealthCoach;
