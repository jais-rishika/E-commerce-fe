import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import RegisterPageComponent from "./component/RegisterPageComponent";

const registerUserApi = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/v1/users/register", {
    name,
    lastName,
    email,
    password,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));

  if (data.success === "User Created") {
    window.location.href = "/user";
  }
  return data;
};
export default function RegisterPage() {
  const reduxDispatch = useDispatch();
  return (
    <RegisterPageComponent
      registerUserApi={registerUserApi}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}
