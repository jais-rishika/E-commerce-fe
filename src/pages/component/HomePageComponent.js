import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import CarouselComponent from "../../components/carouselComponent";

export default function HomePageComponent({categories,fetchBestSellers}) {
    const [mainCategories, setMainCategories] = useState([]);
    const [bestSellers,setBestSellers]= useState([])
    useEffect(() => {
        fetchBestSellers()
        .then((data)=>{
          console.log(data)
          setBestSellers(data)
        })
        .catch((er)=>{
          console.log(er.response. data.message ? er.response.data.message : er.response.data)
        })
        setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
    }, [categories])
  return (
    <div>
      <CarouselComponent bestSellers={bestSellers}/>
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5" >
          {mainCategories.map((category,idx) => (
            <CategoryCardComponent category={category} idx={idx}/>
          ))}  
        </Row>
      </Container>
    </div>
  );
}
