import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditGoalModal({ show, handleClose, goal, onSave }) {
  const [form, setForm] = useState({
    title: '',
    targetAmount: '',
    savedAmount: ''
  });

  useEffect(() => {
    if (goal) {
      setForm({
        title: goal.title || '',
        targetAmount: goal.targetAmount || '',
        savedAmount: goal.savedAmount || ''
      });
    }
  }, [goal]);

  if (!goal) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...goal, ...form });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Goal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-3"
          name="targetAmount"
          value={form.targetAmount}
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control"
          name="savedAmount"
          value={form.savedAmount}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditGoalModal;
