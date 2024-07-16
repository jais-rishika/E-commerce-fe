import React from "react";
import { Container, Row } from "react-bootstrap";
import CategoryCardComponent from "../components/CategoryCardComponent";
import CarouselComponent from "../components/carouselComponent";
export default function HomePage() {
  const categories = [
    "Laptop",
    "Books",
    "Phone",
    "Headset",
    "Kitchen Utensils",
  ];
  return (
    <div>
      <CarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5" >
          {categories.map((category,idx) => (
            <CategoryCardComponent category={category} idx={idx}/>
          ))}
        </Row>
      </Container>
    </div>
  );
}
