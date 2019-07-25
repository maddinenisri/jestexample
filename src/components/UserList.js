import React from "react";
import { Table, Button, Jumbotron } from "react-bootstrap";

const userList = ({ users, showModal, deleteUser }) => (
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
            <td
              className="smallText"
              onClick={e => showModal("Edit User", user)}
            >
              <i className="fa fa-edit"></i>
            </td>
            <td className="smallText" onClick={e => deleteUser(user)}>
              <i className="fa fa-trash"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Button
      id="addUser"
      variant="primary"
      onClick={() => showModal("Add User", { name: "", id: -1 })}
    >
      Add User
    </Button>
  </Jumbotron>
);

export default userList;
