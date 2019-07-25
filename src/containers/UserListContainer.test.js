import React from "react";
import UserListContainer, { UserContainer } from "./UserListContainer";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as actionTypes from "../actionTypes";

const user = { id: 1, name: "test" };
const mockStore = configureMockStore();
const initialState = {
  userReducer: { users: [user] }
};

describe("UserListContainer component", () => {
  describe("<UserContainer />", () => {
    it("should render with default props", () => {
      const userContainer = shallow(<UserContainer />);
      expect(userContainer.find("userList").exists()).toBe(true);
      expect(userContainer.find("customModal").exists()).toBe(true);
    });

    describe("verify business functions", () => {
      const props = {
        users: [
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
          { id: 3, name: "test3" }
        ]
      };
      const mockDeleteUser = jest.fn();
      const mockAddUser = jest.fn();
      const mockSaveUser = jest.fn();
      const wrapper = shallow(
        <UserContainer
          {...props}
          deleteUser={mockDeleteUser}
          addUser={mockAddUser}
          saveUser={mockSaveUser}
        />
      );
      const title = "Add User";
      const user = { id: 4, name: "test" };
      const modifiedName = 'name updated';

      it("verify showModal function", () => {
        wrapper.instance().showModal(title, user);
        expect(wrapper.state().show).toBe(true);
        expect(wrapper.state().title).toEqual(title);
        expect(wrapper.state().user).toEqual(user);
      });

      it('verify updateName function', () => {
        wrapper.instance().updateName(user, {target: { value: modifiedName}});
        expect(wrapper.state().user.name).toEqual(modifiedName);
      });

      it("verify hideModal function", () => {
        wrapper.setState({ show: true });
        wrapper.instance().hideModal();
        expect(wrapper.state().show).toBe(false);
      });

      it("verify addUser function", () => {
        wrapper.instance().addUser({ name: "test" });
        expect(mockAddUser).toBeCalledWith({ id: 4, name: "test" });
      });

      it("verify editUser function", () => {
        wrapper.instance().updateUser({ id: 2, name: "test" });
        expect(mockSaveUser).toBeCalledWith({ id: 2, name: "test" });
      });

      it("verify deleteUser function", () => {
        wrapper.instance().deleteUser({ id: 1, name: "test1" });
        expect(mockDeleteUser).toBeCalledWith({ id: 1, name: "test1" });
      });
    });
  });

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
