import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'ROLE_USER'
  });

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        username: form.username,
        password: form.password,
        email: form.email
        // The role is handled backend-side as per your code (always assigning ROLE_USER).
      };

      await axios.post('http://localhost:8080/api/auth/register', payload);
      alert('Registration successful! You can now login.');
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="form-group mb-3">
          <label>Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Role</label>
          <select className="form-control" name="role" value={form.role} onChange={handleChange}>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN" disabled>Admin (for now)</option>
          </select>
          <small className="text-muted">Role will be handled by backend. Only User allowed now.</small>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
