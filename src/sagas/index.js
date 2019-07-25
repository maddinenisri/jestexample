import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { fetchUsers } from "../actions";

export function* fetchUserList() {
  let data;
  try {
    data = yield call(fetchUsers, 'https://raw.githubusercontent.com/maddinenisri/jestexample/master/src/data/users.json');
    yield put({ type: actionTypes.LOAD_USERS_SUCCESS, payload: data });
  }
  catch(error) {
    yield put({ type: actionTypes.LOAD_USERS_FAILURE, payload: {error} });
  }
}

export function* loadUserList() {
  yield takeEvery(actionTypes.LOAD_USERS, fetchUserList);
}

export default function* rootSaga() {
  yield all([loadUserList()]);
}
