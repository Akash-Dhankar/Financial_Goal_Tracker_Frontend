import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Badge } from 'react-bootstrap';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [goalCount, setGoalCount] = useState(0);
  const [currentAdmin, setCurrentAdmin] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const decoded = JSON.parse(atob(token.split('.')[1]));
    setCurrentAdmin(decoded.sub);

    axios.get('https://goal-tracker-latest.onrender.com/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUsers(res.data);
    });

    axios.get('https://goal-tracker-latest.onrender.com/api/admin/goals/count', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setGoalCount(res.data);
    });
  }, []);

  const deleteUser = id => {
    const token = localStorage.getItem('token');
    axios.delete(`https://goal-tracker-latest.onrender.com/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setUsers(users.filter(u => u.id !== id));
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold text-primary">Admin Dashboard</h2>

      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="m-0">
            <strong>Total Registered Users:</strong> {users.length - 1}
          </h5>
          <h5 className="m-0">
            <strong>Total Goals:</strong> {goalCount}
          </h5>
        </div>
      </div>

      <h4 className="mb-3 text-secondary">User List</h4>

      <div className="row">
        {users
          .filter(user => user.username !== currentAdmin)
          .map(user => (
            <div key={user.id} className="col-md-6 col-lg-4 mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">{user.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                  <p className="mt-3">
                    <strong>Goals:</strong>{' '}
                    <Badge bg="info">{user.goals?.length || 0}</Badge>
                  </p>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
