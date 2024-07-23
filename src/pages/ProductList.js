import axios from "axios";
import ProductListComponent from "./component/ProductListComponent";
const fetchProducts=async()=>{
  const {data}=await axios.get("/api/v1/products/")
  return data
}
export default function ProductListPage() {
  

  return <ProductListComponent fetchProducts={fetchProducts}/>
}
