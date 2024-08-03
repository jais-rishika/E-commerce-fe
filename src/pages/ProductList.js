import axios from "axios";
import { useSelector } from "react-redux";
import ProductListComponent from "./component/ProductListComponent";

let filtersUrl = "";

let proceedFilters=(fil)=>{
  filtersUrl = "";
  Object.keys(fil).map((key,idx)=>{
    if(key==='price'){
      filtersUrl+= `&price=${fil[key]}`
    }
    else if(key==='rating'){
      let rat=""
      Object.keys(fil[key]).map((key2,idx2)=>{
        if(fil[key][key2]){
          rat +=`${key2},`
        }
        return ""
      })
      filtersUrl+= `&rating=`+ rat
    }
    else if(key==="category"){
      let cat=""
      Object.keys(fil[key]).map((key3,idx3)=>{
        if(fil[key][key3]){
          cat +=`${key3},`
        }
        return ""
      })
      filtersUrl += "&category=" + cat;
    }
    else if(key==="attrs"){
      if(fil[key].length>0){
        let val =fil[key].reduce((acc,item)=>{
          let key=item.key
          let val =item.values.join("-")
          return acc+key+"-"+"val+",""
        },"")
        filtersUrl+= "&attrs=" +val
      }
    }
    return ""
  })
  return filtersUrl;
}
const fetchProducts = async (
  categoryName = "", pageNumParam = null, searchQuery = "", filters = {}, sortOption = ""
) => {

  filtersUrl = proceedFilters(filters)
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}` : "";
  const url = `/api/v1/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;
  const { data } = await axios.get(url);
  console.log(data)
  return data;
};

export default function ProductListPage() {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <ProductListComponent
      fetchProducts={fetchProducts}
      categories={categories}
    />
  );
}
