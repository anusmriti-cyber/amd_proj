import React from 'react';

const ProgressRing = ({ 
  radius = 60, 
  stroke = 8, 
  progress = 0, 
  color = 'var(--primary)',
  bgStroke = 'var(--surface-active)',
  children
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      >
        <circle
          stroke={bgStroke}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
