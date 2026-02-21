import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  primary: '#000000',
  text: '#000000',
  textMuted: '#444444',
  textSoft: '#666666',
  bg: '#ffffff',
  bgAlt: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#e0e0e0',
  inverseText: '#ffffff',
};

const darkTheme = {
  primary: '#ffffff',
  text: '#ffffff',
  textMuted: '#b0b0b0',
  textSoft: '#888888',
  bg: '#000000',
  bgAlt: '#1a1a1a',
  cardBg: '#1a1a1a',
  border: '#333333',
  inverseText: '#000000',
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const theme = isDark ? darkTheme : lightTheme;
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-text', theme.text);
    document.documentElement.style.setProperty('--color-text-muted', theme.textMuted);
    document.documentElement.style.setProperty('--color-text-soft', theme.textSoft);
    document.documentElement.style.setProperty('--color-bg', theme.bg);
    document.documentElement.style.setProperty('--color-bg-alt', theme.bgAlt);
    document.documentElement.style.setProperty('--color-card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--color-border', theme.border);
    document.documentElement.style.setProperty('--color-inverse-text', theme.inverseText);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
