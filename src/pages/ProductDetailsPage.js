import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/actions/cartActions";
import ProductDetailComponent from "./component/ProductDetailComponent";

export default function ProductDetailsPage() {  
  const dispatch=useDispatch()
  return <ProductDetailComponent ReduxAddToCart={addToCart} reduxDispatch={dispatch}/>
}
