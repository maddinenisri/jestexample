import React, { Component } from "react";
import { Table, Button, Jumbotron } from "react-bootstrap";
import CustomModal from "../components/Modal";
import { max_number } from "../helpers";

class userList extends Component {
  state = {
    show: false,
    user: {},
    title: ""
  };

  showModal(title, user) {
    this.setState(prevState => ({
      ...prevState,
      title,
      user,
      show: true
    }));
  }

  hideModal = e => this.setState({ show: false });

  updateUser = user => {
    this.props.saveUser(user);
    this.setState({ show: false });
  };

  addUser = user => {
    const ids = this.props.users.map(user => user.id);
    this.props.addUser({ id: max_number(ids) + 1, name: user.name });
    this.setState({ show: false });
  };

  deleteUser = user => {
    this.props.deleteUser(user);
  };

  render() {
    const { users } = this.props;
    const { show, user, title } = this.state;

    return (
      <Jumbotron>
        <Table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td className="smallText">
                  <i
                    className="fa fa-edit"
                    onClick={() => this.showModal("Edit User", user)}
                  ></i>
                </td>
                <td className="smallText">
                  <i
                    className="fa fa-trash"
                    onClick={() => this.deleteUser(user)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button id='addUser'
          variant="primary"
          onClick={() => this.showModal("Add User", { name: '', id: -1 })}
        >
          Add User
        </Button>
        <CustomModal
          show={show}
          title={title}
          user={user}
          handleSave={title === "Add User" ? this.addUser : this.updateUser}
          handleClose={this.hideModal}
        />
      </Jumbotron>
    );
  }
}

export default userList;
