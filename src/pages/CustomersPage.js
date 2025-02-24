import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCustomers } from '../contexts/CustomerContext';
import CustomerCard from '../components/CustomerCard';

const CustomersPage = () => {
  const { user, logout, register } = useAuth();
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  if (!user) return <Navigate to="/" replace />;

  const handleAdd = () => {
    if (username && password && email) {
      const success = register(username, password, email);
      if (success) {
        addCustomer({ username, password, email });
        setUserName('');
        setPassword('');
        setEmail('');
      } else {
        alert('Username existed!');
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Customer Management</Typography>
      <Button variant="outlined" onClick={logout} sx={{ mb: 2 }}>
        Logout
      </Button>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 4 }}
      >
        Add Customer
      </Button>
      <Grid container spacing={2}>
        {customers.map(customer => (
          <Grid item xs={12} md={6} key={customer.id}>
            <CustomerCard
              customer={customer}
              updateCustomer={updateCustomer}
              deleteCustomer={deleteCustomer}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomersPage;
