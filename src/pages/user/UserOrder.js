import axios from "axios";
import UserOrderComponent from "./component/UserOrderComponent";
const getOrder = async (orderID) => {
  const { data } = await axios.get("/api/v1/orders/");
  return data;
};

export default function UserOrder() {
  return <UserOrderComponent getOrder={getOrder}/>;
}
