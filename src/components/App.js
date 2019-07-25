import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import UserListContainer from '../containers/UserListContainer';

class App extends Component {
  render() {
    return (<Container>
      <Row className="row">
        <Col xs={12}>
          <h1>User Management</h1>
          <UserListContainer />
        </Col>
      </Row>
    </Container>);
  }
}

export default App;