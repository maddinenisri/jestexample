import { connect } from "react-redux";
import UserList from "../components/UserList";
import { editUser, addUser, deleteUser } from "../actions";
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
)(UserList);
