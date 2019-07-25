import React from "react";
import { shallow, mount } from "enzyme";
import UserList from "./UserList";

const defaultProps = {
  users: []
};

const props = {
  users: [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" }
  ],
  showModal: jest.fn(),
  deleteUser: jest.fn()
};
describe("UserList", () => {
  it("render with default props", () => {
    const wrapper = shallow(<UserList {...defaultProps} />);
    expect(wrapper.find("Bootstrap(Table)").exists()).toBe(true);
  });

  describe("render with valid values", () => {
    const mockDeleteUser = jest.fn();
    const mockShowModal = jest.fn();
    const wrapper = mount(
      <UserList
        {...props}
        showModal={mockShowModal}
        deleteUser={mockDeleteUser}
      />
    );

    it("when table renders expected data populated", () => {
      expect(wrapper.find("tbody tr").length).toEqual(3);
    });

    it("when user edit action called", () => {
      wrapper
        .find("i.fa.fa-edit")
        .at(0)
        .simulate("click");
      expect(mockShowModal).toBeCalled();
    });

    it("when add user button clicked", () => {
      // console.log(wrapper.debug());
      wrapper.find('Button[id="addUser"]').simulate("click");
      expect(mockShowModal).toBeCalled();
    });

    it("when add user button clicked", () => {
      wrapper
        .find("i.fa.fa-trash")
        .at(0)
        .simulate("click");
      expect(mockDeleteUser).toBeCalledWith({ id: 1, name: "test1" });
    });
  });

  // describe("verify pure functions", () => {
  //   const mockDeleteUser = jest.fn();
  //   const mockAddUser = jest.fn();
  //   const mockSaveUser = jest.fn();
  //   const wrapper = shallow(
  //     <UserList
  //       {...props}
  //       deleteUser={mockDeleteUser}
  //       addUser={mockAddUser}
  //       saveUser={mockSaveUser}
  //     />
  //   );

  // it("verify hideModal function", () => {
  //   wrapper.instance().hideModal();
  //   expect(wrapper.state().show).toBe(false);
  // });

  // it("verify addUser function", () => {
  //   wrapper.instance().addUser({ name: "test" });
  //   expect(mockAddUser).toBeCalledWith({ id: 4, name: "test" });
  // });

  // it("verify editUser function", () => {
  //   wrapper.instance().updateUser({ id: 2, name: "test" });
  //   expect(mockSaveUser).toBeCalledWith({ id: 2, name: "test" });
  // });

  // it("verify deleteUser function", () => {
  //   wrapper.instance().deleteUser({ id: 1, name: "test1" });
  //   expect(mockDeleteUser).toBeCalledWith({ id: 1, name: "test1" });
  // });
  // });
});
