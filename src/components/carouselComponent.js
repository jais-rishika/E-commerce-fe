import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";
import carouselData from "../data/carouselImageComponent";

function CarouselComponent() {
  return (
    <Carousel fluid>
      {carouselData.map((obj, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              crossOrigin="anonymous"
              style={{ height: "300px", objectFit: "cover" }}
              src={obj.img}
              className="d-block w-100"
            />
            <Carousel.Caption>
              <LinkContainer to="/product-list" style={{ cursor: "pointer" }}>
                <h3>{obj.index} slide label</h3>
              </LinkContainer>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
