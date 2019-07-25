import * as actionTypes from "../actionTypes";
import * as actions from "./index";
import data from "../data/users.json";

const mockFetch = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: function() {
        return data;
      }
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: function() {
        return { error: "got error" };
      }
    })
  );

describe("Actions", () => {
  it("should return addUser action", () => {
    expect(actions.addUser({})).toEqual({
      type: actionTypes.ADD_USER_SUCCESS,
      payload: { user: {} }
    });
  });

  it("should return editUser action", () => {
    expect(actions.editUser({})).toEqual({
      type: actionTypes.EDIT_USER_SUCCESS,
      payload: { user: {} }
    });
  });

  it("should return deleteUser action", () => {
    expect(actions.deleteUser({})).toEqual({
      type: actionTypes.DELETE_USER_SUCCESS,
      payload: { user: {} }
    });
  });

  describe("when fetch users function executed", () => {
    beforeEach(() => {
      window.fetch = mockFetch;
    });

    it("expects a success message", async () => {
      const response = await actions.fetchUsers(null);
      expect(response).toEqual({ users: data });
    });

    it("expects a error message", async () => {
      expect.assertions(1);
      try {
        await actions.fetchUsers(null);
      } catch (error) {
        expect(error.message).toMatch("Got error while fetching users");
      }
    });
  });
});
