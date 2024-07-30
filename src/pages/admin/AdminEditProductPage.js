import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveAttributesInTheDoc } from "../../redux/actions/categoryActions";
import EditProductComponent from "./components/EditProductComponent";
import { changeCategory, setAttributeWrapper, setValueForAttributeKey } from "./components/utils/utils";
import { uploadImagesCloudinaryApiRequest } from "./utils/utils";
const fetchProducts = async (productID) => {
  const { data } = await axios.get(`/api/v1/products/get-one/${productID}`);
  return data;
};
const updateProductApiRequest = async (productID, formInputs) => {
  const { data } = await axios.put(`/api/v1/products/admin/${productID}`, {
    ...formInputs,
  });
  return data;
};
const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    console.log(encoded);
    await axios.delete(`/api/v1/products/admin/image/${encoded}/${productId}`);
  };
  const uploadHandler = async (images, productId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });
    await axios.post(
      "/api/v1/products/admin/upload?productId=" + productId,
      formData
    );
  };

  return (
    <EditProductComponent
      categories={categories}
      fetchProducts={fetchProducts}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributesInTheDoc={saveAttributesInTheDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadHandler={uploadHandler}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      changeCategory={changeCategory}
      setAttributeWrapper={setAttributeWrapper}
      setValueForAttributeKey={setValueForAttributeKey}
    />
  );
};

export default AdminEditProductPage;
