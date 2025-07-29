import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import EditGoalModal from './EditGoalModel';
import ConfirmDeleteModal from './confirmDeleteModal';
import { Card, Button } from 'react-bootstrap';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: '', targetAmount: '', savedAmount: '' });
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchGoals();

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload?.sub || 'User');
    } catch {
      setUsername('User');
    }
  }, []);

  const fetchGoals = async () => {
    const res = await axios.get('http://localhost:8080/api/goals', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setGoals(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/goals', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ title: '', targetAmount: '', savedAmount: '' });
    fetchGoals();
  };

  const handleEditSave = async updatedGoal => {
    await axios.put(`http://localhost:8080/api/goals/${updatedGoal.id}`, updatedGoal, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchGoals();
  };

  const handleDeleteConfirm = async () => {
    await axios.delete(`http://localhost:8080/api/goals/${selectedGoal.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setShowDelete(false);
    fetchGoals();
  };

  const groupByMonth = goals.reduce((acc, goal) => {
    const date = new Date(goal.createdAt || new Date());
    const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(goal);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Welcome, <strong>{username}</strong> 👋</h2>

      <div className="card p-4 shadow-sm mb-4">
        <h4 className="text-center mb-3">Add New Financial Goal</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-4">
              <input type="text" name="title" value={form.title} className="form-control" placeholder="Title" onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <input type="number" name="targetAmount" value={form.targetAmount} className="form-control" placeholder="Target Amount" onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <input type="number" name="savedAmount" value={form.savedAmount} className="form-control" placeholder="Saved Amount" onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100">Add</button>
            </div>
          </div>
        </form>
      </div>

      <h4 className="mb-3 text-center">📅 Month-wise Financial Goals</h4>

      {Object.entries(groupByMonth).map(([month, monthlyGoals]) => {
        const totalTarget = monthlyGoals.reduce((sum, g) => sum + g.targetAmount, 0);
        const totalSaved = monthlyGoals.reduce((sum, g) => sum + g.savedAmount, 0);
        const diff = totalSaved - totalTarget;

        return (
          <div key={month} className="mb-5">
            <h5 className="bg-dark text-white p-2 rounded text-center">{month}</h5>
            <div className="row">
              {monthlyGoals.map(goal => {
                const difference = goal.savedAmount - goal.targetAmount;
                const diffColor = difference >= 0 ? 'text-success' : 'text-danger';
                return (
                  <div className="col-md-6 col-lg-4 mb-4" key={goal.id}>
                    <Card className="h-100 shadow border border-2 border-info rounded-4" style={{ background: '#fdfbff' }}>
          <Card.Body>
            <Card.Title className="text-center text-primary fw-bold mb-3">{goal.title}</Card.Title>
            <p><strong>🎯 Target:</strong> ₹{goal.targetAmount}</p>
            <p><strong>💰 Saved:</strong> ₹{goal.savedAmount}</p>
            <p><strong>📅 Created:</strong> {goal.createdAt ? new Date(goal.createdAt).toLocaleDateString() : 'N/A'}</p>
            
            <p className={`fw-semibold ${difference >= 0 ? 'text-success' : 'text-danger'}`}>
              <strong>🔍 Difference:</strong> ₹{difference}
            </p>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="outline-primary" size="sm" onClick={() => { setSelectedGoal(goal); setShowEdit(true); }}>
                ✏️ Edit
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => { setSelectedGoal(goal); setShowDelete(true); }}>
                🗑️ Delete
              </Button>
            </div>
          </Card.Body>
        </Card>

                </div>
                );
              })}
            </div>
            <div className="text-end pe-3">
              <h6>Total Target: ₹{totalTarget} | Total Saved: ₹{totalSaved}</h6>
              <h6 className={diff >= 0 ? 'text-success' : 'text-danger'}>Net Difference: ₹{diff}</h6>
            </div>
            <hr />
          </div>
        );
      })}

      <EditGoalModal show={showEdit} handleClose={() => setShowEdit(false)} goal={selectedGoal} onSave={handleEditSave} />
      <ConfirmDeleteModal show={showDelete} handleClose={() => setShowDelete(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default Dashboard;
