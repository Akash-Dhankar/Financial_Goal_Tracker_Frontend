import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashBoard';
import Header from './components/Header';
import { isLoggedIn, getUserRole } from './utils/auth';

function App() {
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? (role === 'ADMIN' ? '/admin' : '/dashboard') : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={loggedIn && role === 'USER' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={loggedIn && role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
