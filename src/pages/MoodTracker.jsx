import React, { useState, useEffect } from 'react';
import { MOODS } from '../utils/constants';
import { storage } from '../services/storage';
import { getToday, generateId } from '../utils/helpers';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MoodTracker = () => {
  const today = getToday();
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [note, setNote] = useState('');

  useEffect(() => {
    // Load last 7 days of moods for the chart
    let allMoods = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayMoods = storage.getMoods(dateStr).map(m => ({
        ...m,
        dateStr
      }));
      allMoods = [...allMoods, ...dayMoods];
    }
    // Sort chronological
    allMoods.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setMoods(allMoods);
  }, []);

  const handleLog = () => {
    if (!selectedMood) return;

    const newMood = {
      id: generateId(),
      mood: selectedMood,
      energy,
      note,
      timestamp: new Date().toISOString()
    };

    storage.addMood(today, newMood);
    setMoods([...moods, { ...newMood, dateStr: today }]);
    
    // Reset form
    setSelectedMood(null);
    setEnergy(5);
    setNote('');
  };

  // Prepare chart data (Energy vs Time, colored by mood)
  const chartData = moods.map((m, index) => ({
    x: index, // Sequential time
    y: m.energy,
    moodValue: m.mood.value,
    emoji: m.mood.emoji,
    note: m.note,
    time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: m.dateStr
  }));

  const getMoodColor = (val) => {
    if (val >= 4) return 'var(--primary)'; // Green
    if (val === 3) return 'var(--warning)'; // Yellow
    return 'var(--accent)'; // Red
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Mood & Energy</h1>
        <p className="text-muted">Track how you feel to discover correlations with your diet.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px', flex: 1, minHeight: 0 }}>
        
        {/* Left: Input Form */}
        <div className="glass-card animate-slide-up" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div>
            <h3 style={{ marginBottom: '16px' }}>How are you feeling right now?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {MOODS.map(m => (
                <button
                  key={m.label}
                  className={`chip ${selectedMood?.label === m.label ? 'active' : ''}`}
                  onClick={() => setSelectedMood(m)}
                  style={{ 
                    flexDirection: 'column', 
                    padding: '12px', 
                    width: '64px', 
                    height: '74px', 
                    border: selectedMood?.label === m.label ? '2px solid var(--primary)' : '1px solid var(--border)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{m.emoji}</span>
                  <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Energy Level</h3>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--secondary)' }}>{energy}/10</span>
            </div>
            <input 
              type="range" 
              min="1" max="10" 
              value={energy} 
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)' }}
            />
            <div className="flex-between text-muted" style={{ fontSize: '0.8rem', marginTop: '8px' }}>
              <span>Exhausted</span>
              <span>Energetic</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px' }}>Notes (Optional)</h3>
            <textarea 
              className="glass-input" 
              placeholder="E.g., Had a big lunch, feeling sluggish..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', height: '100px', resize: 'none' }}
            />
          </div>

          <button 
            className="btn btn-primary" 
            style={{ marginTop: 'auto', padding: '16px' }}
            disabled={!selectedMood}
            onClick={handleLog}
          >
            Log Entry
          </button>
        </div>

        {/* Right: History & Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
          
          <div className="glass-card animate-slide-in-right" style={{ padding: '24px', height: '300px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-muted)' }}>Energy Trend</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="x" type="number" hide />
                  <YAxis dataKey="y" type="number" domain={[0, 10]} stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div style={{ background: 'rgba(10, 14, 26, 0.9)', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{data.date} {data.time}</div>
                            <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{data.emoji} Energy: {data.y}/10</div>
                            {data.note && <div className="text-muted" style={{ fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '200px' }}>"{data.note}"</div>}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={chartData} shape="circle">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getMoodColor(entry.moodValue)} r={8} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex-center text-muted" style={{ height: '100%' }}>Not enough data yet. Log some entries!</div>
            )}
          </div>

          <div className="glass-card animate-slide-in-right" style={{ padding: '24px', flex: 1, animationDelay: '0.1s' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-muted)' }}>Recent Logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {moods.slice(-5).reverse().map(m => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--surface-active)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '2rem' }}>{m.mood.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>Energy: {m.energy}/10</div>
                    {m.note && <div className="text-muted" style={{ fontSize: '0.875rem' }}>"{m.note}"</div>}
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.75rem', textAlign: 'right' }}>
                    <div>{m.dateStr}</div>
                    <div>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              ))}
              {moods.length === 0 && <div className="text-muted" style={{ textAlign: 'center', padding: '20px' }}>No logs yet.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
