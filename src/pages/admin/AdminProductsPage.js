import axios from "axios";
import ProductsPageComponent from "./components/ProductPageComponent";

const fetchProducts=async(abctrl)=>{
  const {data} =await axios.get("/api/v1/products/admin/",{
    signal: abctrl.signal
  })
  return data;
}
const deleteProducts=async(prodId)=>{
  const {data}=await axios.delete(`/api/v1/products/admin/${prodId}`)
  return data
}
export default function AdminProductsPage() {
  return <ProductsPageComponent fetchProducts={fetchProducts} deleteProducts={deleteProducts}/>
}
