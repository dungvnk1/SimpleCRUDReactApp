import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CustomerProvider } from './contexts/CustomerContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customers" element={<CustomersPage />} />
          </Routes>
        </Router>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
