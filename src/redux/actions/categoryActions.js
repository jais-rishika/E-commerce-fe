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

  export const newCategory= (category) => async(dispatch,getState)=>{
    const cat =getState().getCategories.categories
    const {data}= await axios.post("/api/v1/categories",{category})
    if(data.categoryCreated){
      dispatch({
        type:actionTypes.INSERT_CATEGORY,
        payload: [...cat,data.categoryCreated]
      })
    }
  }

  export const deleteCategory= (category) => async(dispatch,getState)=>{
    const cat =getState().getCategories.categories
    const categories= cat.filter((item)=> item.name!==category)
    const {data}= await axios.delete("/api/v1/categories/"+encodeURIComponent(category))
    if(data.categoryDeleted){
      dispatch({
        type:actionTypes.DELETE_CATEGORY,
        payload: [...categories]
      })
    }
  }
