import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/log', icon: '🍽️', label: 'Log Meal' },
    { path: '/analyze', icon: '📸', label: 'Meal Analyzer' },
    { path: '/coach', icon: '🤖', label: 'AI Coach' },
    { path: '/mood', icon: '😊', label: 'Mood & Energy' },
    { path: '/', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: 'rgba(10, 14, 26, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0'
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 0 15px var(--primary-glow)' }}>
          🌿
        </div>
        <h2 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Nutri<span className="text-gradient">Vision</span></h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              color: isActive ? '#fff' : 'var(--text-muted)',
              background: isActive ? 'var(--surface-active)' : 'transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease',
              border: isActive ? '1px solid var(--border)' : '1px solid transparent'
            })}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            U
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>User Profile</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
