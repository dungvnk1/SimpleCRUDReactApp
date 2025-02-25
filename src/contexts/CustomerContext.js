import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { users, setUsers, register } = useAuth();

  const addCustomer = (customer) => {
    register(customer.username, customer.password, customer.email);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, ...updatedCustomer } : u
    ));
  };

  const deleteCustomer = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <CustomerContext.Provider value={{ 
      customers: users.filter(u => u.role === 'customer'),
      addCustomer,
      updateCustomer,
      deleteCustomer 
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
