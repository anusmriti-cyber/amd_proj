import React, { useState } from 'react';
import { analyzeMeal } from '../services/aiEngine';
import { foodDatabase } from '../data/foodDatabase';
import FoodCard from '../components/FoodSearch/FoodCard';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../hooks/useNutrition';
import { getToday, generateId } from '../utils/helpers';

const MealAnalyzer = () => {
  const navigate = useNavigate();
  const { addMeal } = useNutrition(getToday());
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Take 12 random foods for the visual builder
  const [builderFoods] = useState([...foodDatabase].sort(() => 0.5 - Math.random()).slice(0, 12));

  const toggleFood = (food) => {
    if (selectedFoods.find(f => f.id === food.id)) {
      setSelectedFoods(selectedFoods.filter(f => f.id !== food.id));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFoods.length === 0) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const result = analyzeMeal(selectedFoods);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleLogMeal = () => {
    if (!analysis) return;
    
    // Log each item
    selectedFoods.forEach(food => {
      addMeal({
        id: generateId(),
        food: food,
        portionMultiplier: 1,
        type: 'Lunch', // Default for now
        nutrition: food.nutrition,
        timestamp: new Date().toISOString()
      });
    });
    navigate('/dashboard');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Meal Analyzer</h1>
        <p className="text-muted">Build a meal and let our Smart Engine analyze its nutritional quality.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', flex: 1, minHeight: 0 }}>
        
        {/* Left: Builder */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '24px' }}>Build Your Plate</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {builderFoods.map((food, i) => (
              <div key={food.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <FoodCard 
                  food={food} 
                  active={!!selectedFoods.find(f => f.id === food.id)}
                  onClick={toggleFood}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '16px' }}>Selected Items ({selectedFoods.length})</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', minHeight: '60px' }}>
              {selectedFoods.length === 0 ? (
                <div className="text-muted" style={{ fontStyle: 'italic', width: '100%', textAlign: 'center', alignSelf: 'center' }}>
                  Select foods from the left to build a meal.
                </div>
              ) : (
                selectedFoods.map(f => (
                  <div key={f.id} className="chip active" style={{ fontSize: '1.5rem', padding: '8px' }}>
                    {f.emoji}
                  </div>
                ))
              )}
            </div>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '24px' }}
              disabled={selectedFoods.length === 0 || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Meal'}
            </button>
          </div>

          {isAnalyzing && (
            <div className="glass-card flex-center animate-pulse" style={{ padding: '40px', flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤔</div>
                <h3>Calculating Nutrition...</h3>
              </div>
            </div>
          )}

          {analysis && !isAnalyzing && (
            <div className="glass-card animate-slide-up" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0 }}>Analysis Results</h3>
                <div style={{ 
                  background: analysis.score >= 7 ? 'rgba(0, 214, 143, 0.2)' : analysis.score >= 4 ? 'rgba(254, 202, 87, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                  color: analysis.score >= 7 ? 'var(--primary)' : analysis.score >= 4 ? 'var(--warning)' : 'var(--accent)',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '1.2rem'
                }}>
                  {analysis.score}/10
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--surface-active)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{Math.round(analysis.nutrition.calories)}</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>Calories</div>
                </div>
                <div style={{ background: 'var(--surface-active)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{Math.round(analysis.nutrition.protein)}g</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>Protein</div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                {analysis.strengths.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Strengths</h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {analysis.strengths.map((s, i) => <li key={i} style={{ marginBottom: '4px' }}>{s}</li>)}
                    </ul>
                  </div>
                )}
                
                {analysis.warnings.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Warnings</h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {analysis.warnings.map((w, i) => <li key={i} style={{ marginBottom: '4px' }}>{w}</li>)}
                    </ul>
                  </div>
                )}

                {analysis.suggestions.length > 0 && (
                  <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '8px' }}>Suggestions</h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {analysis.suggestions.map((s, i) => <li key={i} style={{ marginBottom: '4px' }}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <button className="btn btn-outline" style={{ marginTop: '24px', width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)' }} onClick={handleLogMeal}>
                Log This Meal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealAnalyzer;
