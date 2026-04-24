import React from 'react';

const FoodCard = ({ food, onClick, active = false }) => {
  return (
    <div 
      className={`glass-card ${active ? 'active' : ''}`}
      onClick={() => onClick && onClick(food)}
      style={{
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        border: active ? '1px solid var(--primary)' : '1px solid var(--border)',
        boxShadow: active ? '0 0 15px rgba(0, 214, 143, 0.2)' : 'none'
      }}
    >
      <div style={{ fontSize: '2.5rem' }}>{food.emoji}</div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{food.name}</h4>
        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
          {food.nutrition.calories} cal | {food.servingSize}{food.servingUnit}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', width: '80px' }}>
        <div style={{ fontSize: '0.75rem', background: 'rgba(255, 107, 107, 0.2)', color: 'var(--color-protein)', padding: '2px 6px', borderRadius: '4px' }}>
          {food.nutrition.protein}g P
        </div>
        <div style={{ fontSize: '0.75rem', background: 'rgba(78, 205, 196, 0.2)', color: 'var(--color-carbs)', padding: '2px 6px', borderRadius: '4px' }}>
          {food.nutrition.carbs}g C
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
