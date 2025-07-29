import { Modal, Button } from 'react-bootstrap';
function ConfirmDeleteModal({ show, handleClose, onConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this goal?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
