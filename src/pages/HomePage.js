import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import HomePageComponent from "./component/HomePageComponent";
const fetchBestSellers=async()=>{
  const {data}= await axios.get("/api/v1/products/bestsellers")
  return data
}
export default function HomePage() {
  const { categories } = useSelector((state) => state.getCategories);
  return <HomePageComponent categories={categories} fetchBestSellers={fetchBestSellers}/>;
}
