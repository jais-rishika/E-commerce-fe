import React from "react";
import { Outlet } from "react-router-dom";
import UserChatComponents from "./UserChatComponents";
export default function RouteWithUserChatComponent() {
  return (
    <div>
      <UserChatComponents />
      <Outlet />
    </div>
  );
}
