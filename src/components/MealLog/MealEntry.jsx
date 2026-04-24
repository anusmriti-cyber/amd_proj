import React from 'react';

const MealEntry = ({ meal, onRemove }) => {
  return (
    <div className="glass-card flex-between" style={{ padding: '16px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '2rem' }}>{meal.food.emoji}</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h4 style={{ margin: 0 }}>{meal.food.name}</h4>
            <span className="chip" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>{meal.type}</span>
          </div>
          <div className="text-muted" style={{ fontSize: '0.875rem' }}>
            {meal.portionMultiplier * meal.food.servingSize}{meal.food.servingUnit}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{meal.nutrition.calories} cal</div>
          <div className="text-muted" style={{ fontSize: '0.75rem', display: 'flex', gap: '6px' }}>
            <span>P: {meal.nutrition.protein}g</span>
            <span>C: {meal.nutrition.carbs}g</span>
            <span>F: {meal.nutrition.fat}g</span>
          </div>
        </div>
        
        {onRemove && (
          <button 
            className="btn-icon" 
            onClick={() => onRemove(meal.id)}
            title="Remove from log"
            style={{ color: 'var(--accent)', border: 'none' }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default MealEntry;
