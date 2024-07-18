import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstant";
export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};
export const logout = () => (dispatch) => {
  axios.get("/api/v1/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  // localStorage.removeItem("cart")
  dispatch({ type: LOGOUT_USER });
  window.location.href = "http://localhost:3000/login";
};
