import React from 'react';

const Badge = ({ badge, earned = false, delay = 0 }) => {
  return (
    <div 
      className={`glass-card ${earned ? '' : 'unearned'}`}
      style={{ 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        opacity: earned ? 1 : 0.5,
        filter: earned ? 'none' : 'grayscale(100%)',
        animationDelay: `${delay}s`,
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          fontSize: '2.5rem', 
          marginBottom: '8px',
          background: earned ? 'rgba(0, 214, 143, 0.1)' : 'var(--surface-active)',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {badge.icon}
      </div>
      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{badge.title}</h4>
      <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.4 }}>
        {badge.description}
      </p>
      
      {earned && (
        <div style={{ 
          position: 'absolute', top: '8px', right: '8px', 
          background: 'var(--primary)', width: '12px', height: '12px', 
          borderRadius: '50%', boxShadow: '0 0 8px var(--primary-glow)'
        }} />
      )}
    </div>
  );
};

export default Badge;
