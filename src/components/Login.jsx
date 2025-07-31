import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getUserRole } from '../utils/auth';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://goal-tracker-latest.onrender.com/api/auth/login', form);
      localStorage.setItem('token', response.data.token);

      window.dispatchEvent(new Event("authChange"));

      const role = getUserRole();
      navigate(role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="form-group mb-3">
          <label>Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="mt-3 text-center">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
            New user? Register here
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
