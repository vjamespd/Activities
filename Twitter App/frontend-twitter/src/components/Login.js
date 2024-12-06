import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Login response data:', res.data.userId); // Log response data to verify userId
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', res.data.userId);  // Store userId correctly
      console.log('Username and UserID stored in localStorage:', username, res.data.userId); // Log stored username and userId
      setUsername('');
      setPassword('');
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
      <p className="text-center">Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
