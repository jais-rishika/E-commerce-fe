import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import ProductDetailComponent from "./component/ProductDetailComponent";

const fetchProductDetails = async (id) => {
  const { data } = await axios.get(`/api/v1/products/get-one/${id}`);
  return data;
};
const writeReviewApiRequest = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/v1/users/review/${productId}`,{...formInputs});
  return data;
};
export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return (
    <ProductDetailComponent
      ReduxAddToCart={addToCart}
      reduxDispatch={dispatch}
      fetchProductDetails={fetchProductDetails}
      writeReviewApiRequest={writeReviewApiRequest}
      userInfo={userInfo}
    />
  );
}
