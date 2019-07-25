import React, { Component } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

class CustomModal extends Component {
  constructor() {
    super();
    this.state = { user: { name: undefined } };
  }

  updateName = (user, event) => {
    const updatedUser = { ...user, name: event.target.value };
    this.setState(prevState => ({ ...prevState, user: updatedUser }));
  };

  render() {
    const { title, show, user } = this.props;
    return (
      <Modal show={show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={this.state.user.id? this.state.user.name : user.name}
              onChange={event => this.updateName(user, event)}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.props.handleSave(this.state.user)}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CustomModal;
