import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import LoginPageComponent from "./component/LoginPageComponent";

const logInUser = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/v1/users/login", {
    email,
    password,
    doNotLogout,
  });
  if (data.userLoggedIn.doNotLogout) {
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  } else sessionStorage.setItem("userInfo", JSON.stringify.data.userLoggedIn);
  return data;
};

export default function LoginPage() {
  const reduxDispatch = useDispatch();
  return (
    <LoginPageComponent
      logInUser={logInUser}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}
