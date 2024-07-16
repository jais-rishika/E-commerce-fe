import axios from "axios";
import UserPageComponent from "./components/UserPageComponent";
const fetchUsers = async (abctrl) => {
  const { data } = await axios.get("/api/v1/users/", {
    signal: abctrl.signal,
  });
  return data;
};
const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/v1/users/${userId}`);
  return data;
};
export default function AdminUserPage() {
  return <UserPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
}
