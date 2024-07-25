import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserOrderDetailsComponent from "./component/userOrderDetailComponent";

const getOrder=async(orderID)=>{
  const {data}= await axios.get("/api/v1/orders/user/"+orderID)
    return data
}

const UserOrderDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const reduxDispatch = useDispatch();

  const getUser= async()=>{
    const {data}= await axios.get("/api/v1/users/profile/"+userInfo._id)
    return data
  }


  return (
    <UserOrderDetailsComponent
      // cartItems={cartItems}
      // cartSubtotal={cartSubtotal}
      // itemsCount={itemsCount}
      userInfo={userInfo}
      getUser={getUser}
      reduxDispatch={reduxDispatch}
      getOrder={getOrder}
      // addToCart={addToCart}
      // removeFromCart={removeFromCart}
      // createOrder={createOrder}
    />
  );
};

export default UserOrderDetailsPage;
