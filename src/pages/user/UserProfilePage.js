import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";
import UserProfilePageComponent from "./component/UserProfilePageComponent";

const updateUserApi = async (
  name,lastName,phonenumber,address,country,ZIPcode,city,state,password
) => {
  const { data } = await axios.put("/api/v1/users/profile", {
    name,lastName,phonenumber,address,country,ZIPcode,city,state,password});
  return data;
};
const fetchUserApi = async (id) => {
  const { data } = await axios.get(`/api/v1/users/profile/` + id);
  console.log(data);
  return data;
};
export default function UserProfilePage() {
  const reduxDispatch=useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return (
    <UserProfilePageComponent
      updateUserApi={updateUserApi}
      fetchUserApi={fetchUserApi}
      userInfo={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
}
