import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { users } = useAuth();
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const existingEmails = customers.map(c => c.email);
    const newCustomers = users
      .filter(u => !existingEmails.includes(u.email))
      .map(u => ({ id: Date.now() + Math.random(), username: u.username, email: u.email }));
    if (newCustomers.length > 0) {
      setCustomers(prev => [...prev, ...newCustomers]);
    }
    // eslint-disable-next-line
  }, [users]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customer) => {
    setCustomers([...customers, { id: Date.now(), ...customer }]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(c => (c.id === id ? { ...c, ...updatedCustomer } : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
