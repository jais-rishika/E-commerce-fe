import axios from "axios";
import EditUserPageComponent from "./components/EditUserPageComponent";

const fetchUser = async (id) => {
  const { data } = await axios.get(`/api/v1/users/profile/${id}`);
  return data;
};

const updateUserApi = async (userId, name, lastName, email, isAdmin) => {
  console.log("isAdmin:" +isAdmin);
  const { data } = await axios.put(`/api/v1/users/${userId}`, {
    name,
    lastName,
    email,
    isAdmin: isAdmin ? true : false,
  });
  return data;
};
const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      fetchUser={fetchUser}
      updateUserApi={updateUserApi}
    />
  );
};

export default AdminEditUserPage;
