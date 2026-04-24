import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyTrend = ({ data }) => {
  return (
    <div className="glass-card animate-slide-up" style={{ padding: '24px', height: '300px', animationDelay: '0.2s' }}>
      <h3 style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontWeight: 500 }}>7-Day Trend</h3>
      
      <div style={{ width: '100%', height: 'calc(100% - 48px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(10, 14, 26, 0.9)', 
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="calories" 
              stroke="var(--primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCalories)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrend;
