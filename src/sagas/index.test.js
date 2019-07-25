import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { fetchUsers } from "../actions";
import rootSaga, { fetchUserList, loadUserList } from "./index";

// function mockSagaError(saga) {
//   const throwError = error => {
//     return saga.throw(error);
//   };
//   return { throw: throwError };
// }

describe("Saga", () => {
  const dataPath =
    "https://raw.githubusercontent.com/maddinenisri/jestexample/master/src/data/users.json";
  it("should return iterator when called fetchUserList", () => {
    const generator = fetchUserList();
    expect(generator.next().value).toEqual(call(fetchUsers, dataPath));
    expect(generator.next().value).toEqual(
      put({ type: actionTypes.LOAD_USERS_SUCCESS, payload: undefined })
    );
  });

  it("should fails when error", () => {
    const error = "error occurred";
    const generator = fetchUserList();
    generator.next();
    const response = generator.throw(error).value;
    expect(response).toEqual(
      put({ type: actionTypes.LOAD_USERS_FAILURE, payload: { error } })
    );
  });

  it("should return iterator when called loadUserList", () => {
    const generator = loadUserList();
    expect(generator.next().value).toEqual(
      takeEvery(actionTypes.LOAD_USERS, fetchUserList)
    );
  });

  it("should return iterator when called rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([loadUserList()]));
  });
});
