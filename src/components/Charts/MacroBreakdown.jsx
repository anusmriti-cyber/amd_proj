import React from 'react';

const MacroBar = ({ label, consumed, target, color }) => {
  const progress = target > 0 ? Math.min(100, (consumed / target) * 100) : 0;
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="flex-between" style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }}></div>
          <span style={{ fontWeight: 600 }}>{label}</span>
        </div>
        <div style={{ fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-main)' }}>{Math.round(consumed)}g</span>
          <span className="text-muted"> / {target}g</span>
        </div>
      </div>
      <div style={{ height: '8px', background: 'var(--surface-active)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: color, 
            borderRadius: '4px',
            transition: 'width 1s ease-in-out',
            boxShadow: `0 0 10px ${color}`
          }}
        />
      </div>
    </div>
  );
};

const MacroBreakdown = ({ totals, targets }) => {
  if (!targets) return null;

  return (
    <div className="glass-card animate-slide-up" style={{ padding: '24px', animationDelay: '0.1s' }}>
      <h3 style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontWeight: 500 }}>Macro Split</h3>
      
      <MacroBar 
        label="Protein" 
        consumed={totals?.protein || 0} 
        target={targets.protein} 
        color="var(--color-protein)" 
      />
      <MacroBar 
        label="Carbohydrates" 
        consumed={totals?.carbs || 0} 
        target={targets.carbs} 
        color="var(--color-carbs)" 
      />
      <MacroBar 
        label="Fat" 
        consumed={totals?.fat || 0} 
        target={targets.fat} 
        color="var(--color-fat)" 
      />
    </div>
  );
};

export default MacroBreakdown;
