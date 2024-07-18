import axios from "axios";
import React from "react";
import OrdersPageComponent from "./components/OrdersPageComponent";
const fetchOrders = async (abctrl) => {
  const { data } = await axios.get("/api/v1/orders/admin", {
    signal: abctrl.signal,
  });
  console.log(data);
  return data;
};

export default function AdminOrdersPage() {
  return <OrdersPageComponent fetchOrders={fetchOrders} />;
}
