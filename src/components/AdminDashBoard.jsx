import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [goalCount, setGoalCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));

    axios.get('http://localhost:8080/api/admin/goals/count', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setGoalCount(res.data));
  }, []);

  const deleteUser = id => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setUsers(users.filter(u => u.id !== id));
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Admin Dashboard</h3>
      <p>Total Goals: <strong>{goalCount}</strong></p>
      <h5 className="mt-4">All Users</h5>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.username}</strong> — {user.email}
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
