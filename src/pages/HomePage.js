import React from "react";
import { useSelector } from "react-redux";
import HomePageComponent from "./component/HomePageComponent";

export default function HomePage() {
  const { categories } = useSelector((state) => state.getCategories);
  return <HomePageComponent categories={categories} />;
}
