import React from "react";
import * as actionTypes from './actionTypes';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import App from "./components/App";
import rootReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.dispatch({type: actionTypes.LOAD_USERS});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
