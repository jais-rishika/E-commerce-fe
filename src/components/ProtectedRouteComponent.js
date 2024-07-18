import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserChatComponents from "./user/UserChatComponents";

export default function ProtectedRouteComponent({ admin }) {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/v1/get-token").then(
      function (data) {
        if (data.data.token) {
          setIsAuth(data.data.token);
        }
        return isAuth;
      })},
      [isAuth]
    )

  if (isAuth === undefined) return <LoginPage />;
  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponents />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
