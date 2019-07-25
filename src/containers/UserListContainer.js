import React, { Component } from "react";
import { connect } from "react-redux";
import UserList from "../components/UserList";
import { editUser, addUser, deleteUser } from "../actions";
import CustomModal from "../components/Modal";
import { max_number } from "../helpers";

export class UserContainer extends Component {
  state = {
    show: false,
    user: {},
    title: ''
  };

  showModal = (title, user) => {
    this.setState(prevState => ({
      ...prevState,
      title,
      user,
      show: true
    }));
  }

  updateName = (user, event) => {
    const updatedUser = { ...user, name: event.target.value };
    this.setState(prevState => ({ ...prevState, user: updatedUser }));
  };
  
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
    return (
      <React.Fragment>
        <UserList
          showModal={this.showModal}
          deleteUser={this.deleteUser}
          users={this.props.users}
        />
        <CustomModal
          state={this.state}
          handleSave={
            this.state.title === "Add User" ? this.addUser : this.updateUser
          }
          handleClose={this.hideModal}
          updateName={this.updateName}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUser: user => dispatch(editUser(user)),
    addUser: user => dispatch(addUser(user)),
    deleteUser: user => dispatch(deleteUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
