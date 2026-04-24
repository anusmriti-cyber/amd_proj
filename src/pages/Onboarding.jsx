import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoals } from '../hooks/useGoals';

const Onboarding = () => {
  const navigate = useNavigate();
  const { saveProfile } = useGoals();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '', age: 25, gender: 'female', weight: 65, height: 165,
    activityLevel: 'moderate', goal: 'maintain', diet: 'None'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = () => {
    saveProfile(profile);
    navigate('/dashboard');
  };

  return (
    <div className="flex-center" style={{ height: '100%', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome to Nutri<span className="text-gradient">Vision</span></h1>
        <p className="text-muted">Let's set up your personalized nutrition profile.</p>
      </div>

      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ 
              flex: 1, height: '6px', borderRadius: '3px', 
              background: i <= step ? 'var(--primary)' : 'var(--surface-active)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '24px' }}>The Basics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="text-muted" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                <input type="text" name="name" className="glass-input" style={{ width: '100%' }} value={profile.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ display: 'block', marginBottom: '8px' }}>Age</label>
                  <input type="number" name="age" className="glass-input" style={{ width: '100%' }} value={profile.age} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ display: 'block', marginBottom: '8px' }}>Gender</label>
                  <select name="gender" className="glass-input" style={{ width: '100%' }} value={profile.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ display: 'block', marginBottom: '8px' }}>Weight (kg)</label>
                  <input type="number" name="weight" className="glass-input" style={{ width: '100%' }} value={profile.weight} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="text-muted" style={{ display: 'block', marginBottom: '8px' }}>Height (cm)</label>
                  <input type="number" name="height" className="glass-input" style={{ width: '100%' }} value={profile.height} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Activity Level */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '24px' }}>Activity Level</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                { id: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { id: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { id: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                { id: 'veryActive', label: 'Extra Active', desc: 'Very hard exercise & physical job' }
              ].map(level => (
                <div 
                  key={level.id}
                  className={`glass-card ${profile.activityLevel === level.id ? 'active' : ''}`}
                  style={{ padding: '16px', cursor: 'pointer', border: profile.activityLevel === level.id ? '1px solid var(--primary)' : '1px solid var(--border)' }}
                  onClick={() => setProfile(p => ({...p, activityLevel: level.id}))}
                >
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{level.label}</div>
                  <div className="text-muted" style={{ fontSize: '0.875rem' }}>{level.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goal */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '24px' }}>What is your goal?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { id: 'lose', label: 'Lose Weight', icon: '📉' },
                { id: 'maintain', label: 'Maintain Weight', icon: '⚖️' },
                { id: 'gain', label: 'Gain Muscle', icon: '💪' }
              ].map(goal => (
                <div 
                  key={goal.id}
                  className={`glass-card flex-center ${profile.goal === goal.id ? 'active' : ''}`}
                  style={{ padding: '24px', cursor: 'pointer', gap: '16px', border: profile.goal === goal.id ? '1px solid var(--primary)' : '1px solid var(--border)' }}
                  onClick={() => setProfile(p => ({...p, goal: goal.id}))}
                >
                  <span style={{ fontSize: '2rem' }}>{goal.icon}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Dietary Prefs */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '24px' }}>Dietary Preferences</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'].map(diet => (
                <button
                  key={diet}
                  className={`chip ${profile.diet === diet ? 'active' : ''}`}
                  style={{ padding: '12px 24px', fontSize: '1rem' }}
                  onClick={() => setProfile(p => ({...p, diet}))}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
          <button 
            className="btn btn-outline" 
            onClick={handlePrev} 
            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
          >
            Back
          </button>
          
          {step < 4 ? (
            <button className="btn btn-primary" onClick={handleNext}>Next Step</button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>Finish Setup</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
