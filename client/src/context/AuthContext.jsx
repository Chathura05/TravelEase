import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('travelease_user');
    return saved ? JSON.parse(saved) : null;
  });

  const persistUser = (payload) => {
    setUser(payload);
    localStorage.setItem('travelease_user', JSON.stringify(payload));
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persistUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persistUser(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelease_user');
  };

  useEffect(() => {
    if (!user?.token) return;

    api
      .get('/auth/me')
      .then(({ data }) => {
        persistUser({
          ...user,
          ...data,
          token: user.token,
        });
      })
      .catch(() => {
        logout();
      });
  }, [user?.token]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
