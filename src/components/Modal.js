import React from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const customModal = ({ title, show, user, handleSave, handleClose, updateName }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <InputGroup>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={event => updateName(user, event)}
        />
      </InputGroup>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={() => handleSave(user)}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default customModal;
