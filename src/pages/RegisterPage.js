import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useCustomers } from '../contexts/CustomerContext';

const RegisterPage = () => {
  const { user, register } = useAuth();
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to="/customers" replace />;

  const handleRegister = () => {
    const success = register(username, password, email);
    if (success) {
      addCustomer({ username: username, email });
      navigate('/');
    } else {
      setError('Username existed!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister} disabled={!username || !password || !email}>
        Register
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;
