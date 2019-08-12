import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  const wrapper = shallow(<App />);
  it("should render with default props", () => {
    expect(wrapper.find("h1").text()).toEqual("User Management");
    expect(wrapper.find('UserContainer').exists()).toBe(true);
  });
});
