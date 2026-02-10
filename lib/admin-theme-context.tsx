/**
 * Theme context for the CMS admin dashboard.
 * Supports dark and light mode with persistence (localStorage on web).
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type AdminTheme = 'dark' | 'light';

const STORAGE_KEY = 'fulfilx_cms_theme';

function getStoredTheme(): AdminTheme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'dark';
}

function setStoredTheme(theme: AdminTheme) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

interface AdminThemeContextValue {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>(getStoredTheme);

  const setTheme = useCallback((next: AdminTheme) => {
    setThemeState(next);
    setStoredTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setStoredTheme(next);
      return next;
    });
  }, []);

  // Hydrate from storage on mount (in case of SSR or different tab)
  useEffect(() => {
    setThemeState(getStoredTheme());
  }, []);

  const value: AdminThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme(): AdminThemeContextValue {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    return {
      theme: 'dark',
      setTheme: () => {},
      toggleTheme: () => {},
      isDark: true,
      isLight: false,
    };
  }
  return ctx;
}
