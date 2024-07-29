import axios from "axios";
import * as actionTypes from "../constants/categoryConstants";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/v1/categories/");
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};

export const saveAttributesInTheDoc =
  (key, val, categoryChosen) => async (dispatch, getState) => {
    
    const { data } = await axios.post("/api/v1/categories/attribute", {
      key,val,categoryChosen,});
      console.log(data)
    if (data.categoryUploaded) {
      dispatch({
        type: actionTypes.SAVE_ATTR,
        payload: [...data.categoryUploaded],
      });
    }
  };
