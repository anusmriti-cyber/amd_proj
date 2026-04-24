import React from 'react';
import MealEntry from './MealEntry';

const MealList = ({ meals, onRemove }) => {
  if (!meals || meals.length === 0) {
    return (
      <div className="glass-card flex-center" style={{ padding: '40px 20px', flexDirection: 'column', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>🍽️</div>
        <p>No meals logged today.</p>
        <p style={{ fontSize: '0.875rem' }}>Log your food to see your daily progress.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {meals.map((meal, index) => (
        <div key={meal.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-in-right">
          <MealEntry meal={meal} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
};

export default MealList;
