import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const initialUsers = [
  { username: 'admin', password: '123', email: 'admin@toancaugroup.com' }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [user, setUser] = useState(localStorage.getItem('user') || '');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(username);
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  };

  const register = (username, password, email) => {
    if (users.find(u => u.username === username)) {
      return false;
    }
    const newUser = { username, password, email };
    setUsers([...users, newUser]);
    return true;
  };

  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
