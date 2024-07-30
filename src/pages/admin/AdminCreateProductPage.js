import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, newCategory, saveAttributesInTheDoc } from "../../redux/actions/categoryActions";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import { changeCategory, setAttributeWrapper, setValueForAttributeKey } from "./components/utils/utils";
import { uploadImagesCloudinaryApiRequest } from "./utils/utils";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post("/api/products/admin", { formInputs });
  return data;
};
const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch=useDispatch()
  return (
    <CreateProductPageComponent
      categories={categories}
      createProductApiRequest={createProductApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      changeCategory={changeCategory}
      setAttributeWrapper={setAttributeWrapper}
      setValueForAttributeKey={setValueForAttributeKey}
      saveAttributesInTheDoc={saveAttributesInTheDoc}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AdminCreateProductPage;
