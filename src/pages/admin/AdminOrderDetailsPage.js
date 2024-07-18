import axios from "axios";
import OrderDetailsPageComponent from "./components/OrderDetailPageComponent";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/v1/orders/user/" + id);
  return data;
};
const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/v1/orders/delivered/" + id);
  if (data) {
    return data;
  }
};
export default function AdminOrderDetailsPage() {
  return <OrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered}/>;
}
