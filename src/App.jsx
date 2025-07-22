import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
// import Dashboard from './components/Dashboard';
import { useAuth } from './auth/useAuth';

function App() {
  const { token } = useAuth(); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
