import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";
import * as actions from "../actions";
import CustomModal from "../components/Modal";
import { max_number } from "../helpers";

const UserContainer = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const state = useSelector(state => state.userReducer);
  const users = useSelector(state => state.userReducer.users);

  const dispatch = useDispatch();

  const showModal = (title, user) => {
    setShow(true);
    setUser(user);
    setTitle(title);
  };

  const updateName = (user, event) => {
    const updatedUser = { ...user, name: event.target.value };
    setUser(updatedUser);
  };

  const hideModal = e => setShow(false);

  const updateUser = user => {
    dispatch(actions.editUser(user));
    setShow(false);
  };

  const addUser = user => {
    const ids = users.map(user => user.id);
    dispatch(actions.addUser({ id: max_number(ids) + 1, name: user.name }));
    setShow(false);
  };

  const deleteUser = user => {
    dispatch(actions.deleteUser(user));
  };

  console.log(state);
  return (
    <>
      <UserList showModal={showModal} deleteUser={deleteUser} users={users} />
      <CustomModal
        title={title}
        show={show}
        user={user}
        handleSave={title === "Add User" ? addUser : updateUser}
        handleClose={hideModal}
        updateName={updateName}
      />
    </>
  );
};

export default UserContainer;
