import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToday, getLast7Days } from '../utils/helpers';
import { useNutrition } from '../hooks/useNutrition';
import { useStreaks } from '../hooks/useStreaks';
import CalorieRing from '../components/Charts/CalorieRing';
import MacroBreakdown from '../components/Charts/MacroBreakdown';
import WeeklyTrend from '../components/Charts/WeeklyTrend';
import StatCard from '../components/common/StatCard';
import MealList from '../components/MealLog/MealList';
import { storage } from '../services/storage';

const Dashboard = () => {
  const navigate = useNavigate();
  const today = getToday();
  const { meals, water, totals, targets, updateWater } = useNutrition(today);
  const { streak } = useStreaks(today);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Check if onboarding is complete
    if (!storage.getProfile()) {
      navigate('/onboarding');
      return;
    }

    // Load weekly data for chart
    const days = getLast7Days();
    const data = days.map(d => {
      const dayMeals = storage.getMeals(d.date);
      const cals = dayMeals.reduce((acc, m) => acc + m.nutrition.calories, 0);
      return { day: d.day, calories: cals };
    });
    setWeeklyData(data);
  }, [navigate]);

  if (!targets) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div className="flex-between">
        <div>
          <h1 style={{ marginBottom: '8px' }}>Today's Overview</h1>
          <p className="text-muted">Stay on track with your daily goals.</p>
        </div>
        <div className="glass-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>🔥</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{streak.count} Day</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Current Streak</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Left Column: Hero Ring */}
        <div style={{ height: '400px' }}>
          <CalorieRing consumed={totals.calories} target={targets.calories} />
        </div>

        {/* Right Column: Macros & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <MacroBreakdown totals={totals} targets={targets} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <StatCard title="Protein" value={`${Math.round(totals.protein)}g`} icon="🍗" color="var(--color-protein)" delay={0.2} />
            <StatCard title="Carbs" value={`${Math.round(totals.carbs)}g`} icon="🥖" color="var(--color-carbs)" delay={0.3} />
            <StatCard title="Fat" value={`${Math.round(totals.fat)}g`} icon="🥑" color="var(--color-fat)" delay={0.4} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Weekly Trend */}
        <WeeklyTrend data={weeklyData} />

        {/* Hydration */}
        <div className="glass-card animate-slide-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animationDelay: '0.3s' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-muted)', fontWeight: 500, alignSelf: 'flex-start' }}>Hydration</h3>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💧</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <button className="btn-icon" onClick={() => updateWater(-1)} disabled={water <= 0}>-</button>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{water} <span className="text-muted" style={{ fontSize: '1rem' }}>/ 8</span></h2>
            <button className="btn-icon" onClick={() => updateWater(1)}>+</button>
          </div>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Glasses of water</p>
        </div>
      </div>

      <div>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <h2>Today's Meals</h2>
          <button className="btn btn-primary" onClick={() => navigate('/log')}>+ Log Meal</button>
        </div>
        <MealList meals={meals} />
      </div>

    </div>
  );
};

export default Dashboard;
