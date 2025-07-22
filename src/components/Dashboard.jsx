import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [username, setUsername] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', targetAmount: '', savedAmount: '' });

  const api = axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    api.get('/goals')
      .then(res => {
        setGoals(res.data);
        if (res.data.length > 0) {
          setUsername(res.data[0].user?.username || 'User'); 
        }
      })
      .catch(err => console.error(err));
  }, []);

  const addGoal = () => {
    api.post('/goals', newGoal)
      .then(res => {
        setGoals([...goals, res.data]);
        setNewGoal({ title: '', targetAmount: '', savedAmount: '' });
      })
      .catch(err => console.error(err));
  };

  const updateGoal = (id, updated) => {
    api.put(`/goals/${id}`, updated)
      .then(res => {
        setGoals(goals.map(g => (g.id === id ? res.data : g)));
      });
  };

  return (
    <div>
      <h2>Goal Tracker</h2>
      <h4>Welcome, {username || 'User'}</h4>

      <h3>Add New Goal</h3>
      <input placeholder="Title" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} />
      <input type="number" placeholder="Target Amount" value={newGoal.targetAmount} onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })} />
      <input type="number" placeholder="Saved Amount" value={newGoal.savedAmount} onChange={(e) => setNewGoal({ ...newGoal, savedAmount: e.target.value })} />
      <button onClick={addGoal}>Add Goal</button>

      <h3>My Goals</h3>
      {goals.map((goal) => (
        <div key={goal.id} style={{ marginBottom: '10px' }}>
          <strong>{goal.title}</strong> — ₹{goal.savedAmount} / ₹{goal.targetAmount}
          <button onClick={() => {
            const newSaved = prompt('Update saved amount:', goal.savedAmount);
            if (newSaved) updateGoal(goal.id, { ...goal, savedAmount: parseFloat(newSaved) });
          }}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
