import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodSearch from '../components/FoodSearch/FoodSearch';
import { calculateMealNutrition } from '../services/nutritionCalc';
import { useNutrition } from '../hooks/useNutrition';
import { getToday, generateId } from '../utils/helpers';
import { MEAL_TYPES } from '../utils/constants';

const FoodLogger = () => {
  const navigate = useNavigate();
  const { addMeal } = useNutrition(getToday());
  const [selectedFood, setSelectedFood] = useState(null);
  const [portion, setPortion] = useState(1);
  const [mealType, setMealType] = useState('Snack');

  const handleLogMeal = () => {
    if (!selectedFood) return;
    
    const nutrition = calculateMealNutrition(selectedFood, portion);
    
    const mealEntry = {
      id: generateId(),
      food: selectedFood,
      portionMultiplier: portion,
      type: mealType,
      nutrition,
      timestamp: new Date().toISOString()
    };

    addMeal(mealEntry);
    navigate('/dashboard');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Log a Meal</h1>
        <p className="text-muted">Search our database of 500+ foods.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedFood ? '1fr 350px' : '1fr', gap: '32px', flex: 1, minHeight: 0 }}>
        
        {/* Left Side: Search */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <FoodSearch onSelectFood={setSelectedFood} />
        </div>

        {/* Right Side: Detail Panel */}
        {selectedFood && (
          <div className="glass-card animate-slide-in-right" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ fontSize: '4rem', lineHeight: 1 }}>{selectedFood.emoji}</div>
              <button className="btn-icon" onClick={() => setSelectedFood(null)}>✕</button>
            </div>
            
            <h2 style={{ marginBottom: '8px' }}>{selectedFood.name}</h2>
            <div className="text-muted" style={{ marginBottom: '24px' }}>
              Base serving: {selectedFood.servingSize}{selectedFood.servingUnit}
            </div>

            <div style={{ background: 'var(--surface-active)', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                {Math.round(selectedFood.nutrition.calories * portion)}
              </div>
              <div className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px' }}>Calories</div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '12px' }}>Portion Size</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0.5, 1, 1.5, 2].map(p => (
                  <button 
                    key={p} 
                    className={`chip ${portion === p ? 'active' : ''}`}
                    onClick={() => setPortion(p)}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {p}x
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '12px' }}>Meal Type</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {MEAL_TYPES.map(type => (
                  <button 
                    key={type} 
                    className={`chip ${mealType === type ? 'active' : ''}`}
                    onClick={() => setMealType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleLogMeal}>
                Log {mealType}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FoodLogger;
