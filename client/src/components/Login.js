import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Container } from '@mui/material';
import './Registration.css';
import { toast } from 'react-toastify';
import Profile from './Profile';

const Login = () => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLogin, setLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      if (!formData.username && !formData.password) {
        setError('Username and password are required');
        return;
      } else if (!formData.username) {
        setError('Username is required');
        return;
      } else if (!formData.password) {
        setError('Password is required');
        return;
      }

      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success("Login Successfully");
      setLogin(true);
    } catch (error) {
      setError('Login failed');
      setLogin(false);
      toast.error("Login failed!")
    }
  };

  // Render the Profile component if the form is successfully Login
  if (isLogin) {
    return <Profile formData={formData} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className='login'>
        <Typography variant="h3" align="center">
          Login
        </Typography>
        {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
