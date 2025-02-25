import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const initialUsers = [
  { id: 1, username: 'admin', password: '123', email: 'admin@toancaugroup.com', role: 'admin' }
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

    const newId = users.length > 0 
      ? Math.max(...users.map(u => parseInt(u.id))) + 1 
      : 1;

    const newUser = { 
      id: newId,
      username, 
      password, 
      email,
      role: 'customer'
    };

    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUsers, login, logout, register, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
