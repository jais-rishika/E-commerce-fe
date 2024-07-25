import axios from "axios";
import * as action_types from "../constants/cartConstants";

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/get-one/${productId}`);
  dispatch({
    type: action_types.ADD_TO_CART,
    payload: {
      productID: data._id,
      name: data.name,
      price: data.price,
      image: data.images[0] ?? null,
      count: data.count,
      quantity,
    },
  });
  localStorage.setItem("cart",JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart=(productID,price,quantity)=> async(dispatch,getState)=>{
  dispatch({
    type: action_types.REMOVE_FROM_CART,
    payload:{
      productID: productID,
      price: price,
      quantity:quantity ,
    }
  })
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
}
