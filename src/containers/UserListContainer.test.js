import React from "react";
import UserListContainer from "./UserListContainer";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as actionTypes from "../actionTypes";

const user = { id: 1, name: "test" };
const mockStore = configureMockStore();
const initialState = {
  userReducer: { users: [user] }
};

describe("UserListContainer component", () => {
  let wrapper, store;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<UserListContainer store={store} />);
  });

  it("should render component ", () => {
    expect(
      wrapper.props().children.props.store.getState().userReducer.users
    ).toEqual([user]);
  });

  it("should dispatch edit user action", () => {
    wrapper.props().children.props.saveUser(user);
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: actionTypes.EDIT_USER_SUCCESS, payload: { user: user } }
    ]);
  });

  it("should dispatch add user action", () => {
    wrapper.props().children.props.addUser(user);
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: actionTypes.ADD_USER_SUCCESS, payload: { user: user } }
    ]);
  });

  it("should dispatch delete user action", () => {
    wrapper.props().children.props.deleteUser(user);
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: actionTypes.DELETE_USER_SUCCESS, payload: { user: user } }
    ]);
  });
});
