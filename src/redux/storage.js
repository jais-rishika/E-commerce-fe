import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  cart: userRegisterLoginReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const INITIAL_STATE={
    userRegisterLogin: {userInfo: userInfoInLocalStorage}
}
const middleware = [thunk];

const store = createStore(
  reducer,
  { cart: { value: 0 } },
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
