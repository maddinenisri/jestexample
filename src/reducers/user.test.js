import * as actionTypes from "../actionTypes";
import UserReducer from "./user";

const users = [{ id: 1, name: "Srini" }, { id: 2, name: "Anish" }];
const mockUser = { id: 3, name: "test" };

describe("UserReducer", () => {
  it('when non mapped action trigger', () => {
    expect(UserReducer({ }, {})).toEqual({});
  })

  it("when add user success action triggered global state should update with user", () => {
    const addUserAction = {
      type: actionTypes.ADD_USER_SUCCESS,
      payload: { user: mockUser }
    };
    expect(UserReducer({ users }, addUserAction)).toEqual({
      users: [...users, mockUser]
    });
  });

  it("when load user success action triggered global state should update with user", () => {
    const addUserAction = {
      type: actionTypes.LOAD_USERS_SUCCESS,
      payload: { users: [mockUser] }
    };
    expect(UserReducer({ }, addUserAction)).toEqual({
      users: [mockUser]
    });
  });

  it("when add user failure action triggered global state should update with user", () => {
    const addUserAction = {
      type: actionTypes.ADD_USER_FAILURE,
      payload: { error: 'error occurred' }
    };
    expect(UserReducer({ }, addUserAction)).toEqual({
      error: 'error occurred'
    });
  });

  it("when edit user action triggered global state should update specific user", () => {
    const updateUser = { id: 3, name: "Changed" };
    const editUserAction = {
      type: actionTypes.EDIT_USER_SUCCESS,
      payload: { user: updateUser }
    };

    expect(
      UserReducer({ users: [...users, updateUser] }, editUserAction)
    ).toEqual({
      users: [...users, updateUser]
    });
    expect(UserReducer({ users: [...users] }, editUserAction)).toEqual({
      users: [...users]
    });

    editUserAction.payload.user = { id: 1, name: "test" };
    expect(
      UserReducer({ users }, editUserAction)
    ).toEqual({
      users: [{ id: 1, name: "test" }, users[1]]
    });
  });

  it("when user deleted action triggered global state will delete user from store ", () => {
    const deleteUser = { id: 3, name: "Changed" };
    const deleteUserAction = {
      type: actionTypes.DELETE_USER_SUCCESS,
      payload: { user: deleteUser }
    };

    expect(
      UserReducer({ users: [...users, deleteUser] }, deleteUserAction)
    ).toEqual({
      users: [...users]
    });
  });
});
