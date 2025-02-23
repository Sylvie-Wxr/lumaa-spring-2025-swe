import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import '../styles/auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5120/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/');  // Redirect to login after successful registration
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <Paper elevation={2} className="auth-paper">
      <Typography variant="h4" component="h1" className="auth-title">
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleRegister} className="auth-form">
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth-submit"
        >
          REGISTER
        </Button>
      </Box>

      <div className="auth-footer">
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Already have an account?
        </Typography>
        <Link to="/" className="auth-link">
          LOGIN
        </Link>
      </div>
    </Paper>
  );
}

export default Register;