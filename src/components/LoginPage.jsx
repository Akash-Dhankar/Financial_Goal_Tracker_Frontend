import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignup ? { username, email, password } : { username, password };

    try {
      const res = await axios.post(url, payload);
      if (!isSignup) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      } else {
        alert('Signup successful! Please log in.');
        setIsSignup(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication error');
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        {isSignup && (
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        )}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isSignup ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isSignup ? 'Already a user? Login' : 'New user? Sign up'}
      </p>
    </div>
  );
}

export default LoginPage;
