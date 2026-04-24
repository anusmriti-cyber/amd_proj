import React from 'react';

const StatCard = ({ title, value, subtitle, icon, color = 'var(--primary)', delay = 0 }) => {
  return (
    <div 
      className="glass-card animate-slide-up" 
      style={{ padding: '20px', animationDelay: `${delay}s` }}
    >
      <div className="flex-between" style={{ marginBottom: '12px' }}>
        <h4 className="text-muted" style={{ fontWeight: 500, margin: 0 }}>{title}</h4>
        <div 
          style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: `rgba(${color === 'var(--primary)' ? '0, 214, 143' : color === 'var(--color-protein)' ? '255, 107, 107' : color === 'var(--color-carbs)' ? '78, 205, 196' : '254, 202, 87'}, 0.2)`,
            color: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem'
          }}
        >
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>{value}</h2>
        {subtitle && <span className="text-muted" style={{ fontSize: '0.875rem' }}>{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
