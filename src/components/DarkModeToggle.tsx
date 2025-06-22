'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      enableDarkMode();
    }
  }, []);

  const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setIsDark(true);
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    setIsDark(false);
  };

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <span className="flex items-center">
          <span className="mr-1">☀️</span> Light
        </span>
      ) : (
        <span className="flex items-center">
          <span className="mr-1">🌙</span> Dark
        </span>
      )}
    </button>
  );
}
