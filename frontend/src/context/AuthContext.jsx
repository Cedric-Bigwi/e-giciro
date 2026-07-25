import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('egiciro_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('egiciro_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res.data.data.user);
        localStorage.setItem('egiciro_user', JSON.stringify(res.data.data.user));
      })
      .catch(() => {
        localStorage.removeItem('egiciro_token');
        localStorage.removeItem('egiciro_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (phone_number, password) => {
    const res = await api.post('/auth/login', { phone_number, password });
    const { user: loggedInUser, token } = res.data.data;
    localStorage.setItem('egiciro_token', token);
    localStorage.setItem('egiciro_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post('/auth/register', payload);
    const { user: newUser, token } = res.data.data;
    localStorage.setItem('egiciro_token', token);
    localStorage.setItem('egiciro_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('egiciro_token');
    localStorage.removeItem('egiciro_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
