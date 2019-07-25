import { createStore } from "redux";
import rootReducer from "./index";
import userReducer from "./user";

describe("RootReducer", () => {
  let store = createStore(rootReducer);

  it("expect user reducer exist", () => {
    //   console.log(store.getState().userReducer);
    //   console.log(userReducer(undefined, {}));
    expect(store.getState().userReducer).toEqual(userReducer(undefined, {}));
  });
});
