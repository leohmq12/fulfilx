import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '@/types/cms';

const CMS_API_URL = process.env.EXPO_PUBLIC_CMS_API_URL || '/api/cms';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ ok: false }),
  logout: () => {},
  refreshUser: async () => {},
});

const TOKEN_KEY = 'cms_auth_token';
const USER_KEY = 'cms_auth_user';

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeAuth(token: string, user: User): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
}

function clearAuth(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Restore session on mount
  useEffect(() => {
    const token = getStoredToken();
    const user = getStoredUser();
    if (token && user) {
      setState({ user, token, isLoading: false, isAuthenticated: true });
      // Verify token is still valid
      fetch(`${CMS_API_URL}/auth.php?action=me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => {
          if (data.ok) {
            setState(prev => ({ ...prev, user: data.user, isLoading: false }));
            storeAuth(token, data.user);
          } else {
            clearAuth();
            setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
          }
        })
        .catch(() => {
          // Keep cached user if network fails
          setState(prev => ({ ...prev, isLoading: false }));
        });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${CMS_API_URL}/auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.ok) {
        storeAuth(data.token, data.user);
        setState({
          user: data.user,
          token: data.token,
          isLoading: false,
          isAuthenticated: true,
        });
        return { ok: true };
      }
      return { ok: false, error: data.error || 'Login failed' };
    } catch (err: any) {
      return { ok: false, error: err.message || 'Network error' };
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
  }, []);

  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    if (!token) return;
    try {
      const res = await fetch(`${CMS_API_URL}/auth.php?action=me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ok) {
        storeAuth(token, data.user);
        setState(prev => ({ ...prev, user: data.user }));
      }
    } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export default AuthContext;
