import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import UserCartDetailsComponent from "./component/UserCartDetailComponent";

const UserCartDetails = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const userInfo = useSelector((state)=> state.userRegisterLogin.userInfo)

  const reduxDispatch=useDispatch()
  const getUser= async()=>{
    const {data}= await axios.get("/api/v1/users/profile/"+userInfo._id)
    return data
  }
  return (
    <UserCartDetailsComponent
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      itemsCount={itemsCount}
      userInfo={userInfo}
      getUser={getUser}
      reduxDispatch={reduxDispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );
};

export default UserCartDetails;
