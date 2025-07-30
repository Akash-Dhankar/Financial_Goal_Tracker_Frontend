import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashBoard';
import Header from './components/Header';
import { isLoggedIn, getUserRole } from './utils/auth';

function App() {
  const [auth, setAuth] = useState({ isLoggedIn: false, role: null });

  useEffect(() => {
    const updateAuth = () => {
      const loggedIn = isLoggedIn();
      const role = getUserRole();
      setAuth({ isLoggedIn: loggedIn, role: role });
    };

    updateAuth();

    window.addEventListener("authChange", updateAuth);
    return () => window.removeEventListener("authChange", updateAuth);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={auth.isLoggedIn ? (auth.role === 'ADMIN' ? '/admin' : '/dashboard') : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={auth.isLoggedIn && auth.role === 'USER' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={auth.isLoggedIn && auth.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
