import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FoodLogger from './pages/FoodLogger';
import MealAnalyzer from './pages/MealAnalyzer';
import HealthCoach from './pages/HealthCoach';
import MoodTracker from './pages/MoodTracker';
import Badge from './components/common/Badge';
import { useStreaks } from './hooks/useStreaks';
import { getToday } from './utils/helpers';
import './App.css';

function App() {
  const { newBadges, evaluateBadges, clearNewBadges } = useStreaks(getToday());
  const location = useLocation();

  // Run badge evaluation on page changes to simulate global state check
  useEffect(() => {
    evaluateBadges();
  }, [location.pathname, evaluateBadges]);

  return (
    <>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="log" element={<FoodLogger />} />
          <Route path="analyze" element={<MealAnalyzer />} />
          <Route path="coach" element={<HealthCoach />} />
          <Route path="mood" element={<MoodTracker />} />
        </Route>
      </Routes>

      {/* Global Badge Notification Overlay */}
      {newBadges.length > 0 && (
        <div 
          className="animate-slide-up"
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-end'
          }}
        >
          {newBadges.map((badge, i) => (
            <div key={badge.id} style={{ position: 'relative' }}>
              <div 
                style={{ 
                  position: 'absolute', top: '-10px', right: '-10px', 
                  background: 'var(--primary)', color: '#000', padding: '4px 8px', 
                  borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', zIndex: 1 
                }}
              >
                New Badge!
              </div>
              <Badge badge={badge} earned={true} delay={i * 0.2} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
