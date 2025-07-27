import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'

function Dashboard() {
  const [username, setUsername] = useState('');
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: '', targetAmount: '', savedAmount: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/goals', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setGoals(res.data);
    try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUsername(payload?.sub || 'User');
    } catch (err) {
    console.error('Invalid token format', err);
    setUsername('User');
}

    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8080/api/goals', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const getMonth = dateStr => new Date(dateStr).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="container mt-4">
      <h3>Welcome, {username} 👋</h3>

      <div className="mt-4 mb-3 p-3 border rounded bg-light">
        <h5>Add Financial Goal</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-2">
              <input type="text" className="form-control" name="title" placeholder="Title" onChange={handleChange} required />
            </div>
            <div className="col-md-3 mb-2">
              <input type="number" className="form-control" name="targetAmount" placeholder="Target Amount" onChange={handleChange} required />
            </div>
            <div className="col-md-3 mb-2">
              <input type="number" className="form-control" name="savedAmount" placeholder="Saved Amount" onChange={handleChange} required />
            </div>
            <div className="col-md-2 mb-2">
              <button type="submit" className="btn btn-primary w-100">Add</button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <h5>Month-wise Goals</h5>
        {goals.length === 0 && <p>No goals added yet.</p>}

        {Object.entries(
          goals.reduce((acc, goal) => {
            const month = getMonth(goal.createdAt || new Date());
            if (!acc[month]) acc[month] = [];
            acc[month].push(goal);
            return acc;
          }, {})
          ).map(([month, monthlyGoals]) => (
           <div key={month} className="mb-4">
            <h6>{month}</h6>
             < ul className="list-group">
               {monthlyGoals.map(goal => (
                 <li className="list-group-item d-flex justify-content-between align-items-center" key={goal.id}>
                  <span>
                    <strong>{goal.title}</strong> - ₹{goal.savedAmount} / ₹{goal.targetAmount}
                  </span>
                 </li>
               ))}
             </ul>
            </div>
       ))}
      </div>
    </div>
  );
}

export default Dashboard;
