import React from 'react';

interface ThemeToggleProps {
  onToggle: () => void;
  isDark: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle, isDark }) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {isDark ? '🌞' : '🌙'}
    </button>
  );
}; 