import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { getCategoriesReducer } from "./reducers/categoryReducers";
import { userRegisterLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  userRegisterLogin: userRegisterLoginReducer,
  cart: cartReducer,
  getCategories: getCategoriesReducer,
});

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const cartItemInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")): [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemInLocalStorage,
    itemsCount: cartItemInLocalStorage? cartItemInLocalStorage.reduce((quantity,item)=>
      Number(item.quantity)+ quantity, 0):0,
    cartSubtotal: cartItemInLocalStorage? cartItemInLocalStorage.reduce((price,item)=>
    price+ item.price * item.quantity, 0):0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);
console.log(INITIAL_STATE);
export default store;
