import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to="/customers" replace />;

  const handleLogin = () => {
    const success = login(username, password);
    if (!success) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
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
      <Button variant="contained" onClick={handleLogin} disabled={!username || !password}>
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        If you don't have account, please <Link to="/register">register</Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
