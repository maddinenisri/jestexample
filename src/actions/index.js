import * as actionTypes from "../actionTypes";

export async function fetchUsers(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error("Got error while fetching users");
  }
  let data = await response.json();
  return { users: data };
}

export const addUser = user => {
  return { type: actionTypes.ADD_USER_SUCCESS, payload: { user: user } };
};

export const editUser = user => {
  return { type: actionTypes.EDIT_USER_SUCCESS, payload: { user: user } };
};

export const deleteUser = user => {
  return { type: actionTypes.DELETE_USER_SUCCESS, payload: { user: user } };
};
