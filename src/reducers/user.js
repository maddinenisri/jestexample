import * as actionTypes from "../actionTypes";

const initialState = {
  users: [],
  loading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload.user]
      };
    case actionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    case actionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users
      };
    case actionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: filterUsers(state.users, action.payload.user)
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => action.payload.user.id !== user.id)
      };
    default:
      return state;
  }
};

const filterUsers = (users, user) => {
    const index = users.findIndex(u => u.id === user.id);
    let data = users;
    if(index > 0) {
        data = [...users.slice(0, index), user, ...users.slice(index+1)];
    }
    else if(index === 0) {
        data = [user, ...users.slice(index+1)];
    }
    return data;
};

export default userReducer;