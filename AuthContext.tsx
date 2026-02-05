import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authState = sessionStorage.getItem('pa_auth');
    if (authState === 'true') setIsAuthenticated(true);
  }, []);

  const login = (u: string, p: string) => {
    // Credentials: User: Wk (case insensitive), Pass: 941819
    // Using trim() to remove accidental whitespace
    if (u.trim().toLowerCase() === 'wk' && p.trim() === '941819') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pa_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pa_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);