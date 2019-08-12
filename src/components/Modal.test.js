import React from "react";
import { shallow, mount } from "enzyme";
import CustomModal from "./Modal";

describe("CustomModal", () => {
  const defaultProps = {
    title: "", show: false, user: {name: ''}
  };

  const mockSave = jest.fn();
  const mockClose = jest.fn();
  const mockUpdateName = jest.fn();
  const props = {
    title: "test title", 
    show: true, 
    user: { id: 1, name: "test" },
    handleSave: mockSave,
    handleClose: mockClose,
    updateName: mockUpdateName
  };

  it("when render with default props", () => {
    const wrapper = shallow(<CustomModal {...defaultProps} />);
    // console.log(wrapper.debug());
    expect(wrapper.find("Bootstrap(Modal)").exists()).toBe(true);
    expect(wrapper.find("Bootstrap(Modal)").props().show).toBe(false);
  });

  describe("render with valid values", () => {
    const wrapper = mount(<CustomModal {...props} />);

    it("when component renders", () => {
      // console.log(wrapper.debug());
      expect(wrapper.find("Bootstrap(Modal)").props().show).toBe(true);
      expect(wrapper.find("div.modal-title.h4").text()).toEqual(
        props.title
      );
    });

    it("when name change event trigger", () => {
      wrapper
        .find('input[name="name"]')
        .simulate("change", { target: { value: "modified value" } });
      expect(mockUpdateName).toBeCalled();
    });

    it("when save action trigger", () => {
      wrapper.find('Button[variant="primary"]').simulate("click");
      expect(mockSave).toBeCalledWith({ id: 1, name: "test" });
    });
  });
});
