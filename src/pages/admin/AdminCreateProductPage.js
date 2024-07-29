import axios from "axios";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import { uploadImagesCloudinaryApiRequest } from "./utils/utils";
const createProductApiRequest =async(formInputs)=>{
  const {data}= await axios.post('/api/products/admin', {formInputs})
  return data;
}
const AdminCreateProductPage = () => {
  
  return <CreateProductPageComponent createProductApiRequest={createProductApiRequest}
  uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}/>
};

export default AdminCreateProductPage;
