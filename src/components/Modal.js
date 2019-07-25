import React from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const customModal = ({ state, handleSave, handleClose, updateName }) => (
  <Modal show={state.show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{state.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <InputGroup>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Name"
          value={state.user.name}
          onChange={event => updateName(state.user, event)}
        />
      </InputGroup>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={() => handleSave(state.user)}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default customModal;
