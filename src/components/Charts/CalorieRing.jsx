import React from 'react';
import ProgressRing from '../common/ProgressRing';

const CalorieRing = ({ consumed, target }) => {
  const progress = target > 0 ? (consumed / target) * 100 : 0;
  const remaining = Math.max(0, target - consumed);
  const isOver = consumed > target;

  return (
    <div className="glass-card animate-slide-up" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h3 style={{ margin: '0 0 24px 0', alignSelf: 'flex-start', color: 'var(--text-muted)', fontWeight: 500 }}>Calories</h3>
      
      <ProgressRing 
        radius={110} 
        stroke={16} 
        progress={progress} 
        color={isOver ? 'var(--accent)' : 'var(--primary)'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
            {Math.round(remaining)}
          </div>
          <div className="text-muted" style={{ fontSize: '1rem', marginTop: '4px', fontWeight: 500 }}>
            {isOver ? 'Over Target' : 'Remaining'}
          </div>
        </div>
      </ProgressRing>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '4px' }}>Target</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{target}</div>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '4px' }}>Consumed</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{Math.round(consumed)}</div>
        </div>
      </div>
    </div>
  );
};

export default CalorieRing;
