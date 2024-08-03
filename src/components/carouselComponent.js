import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

function CarouselComponent({bestSellers}) {
  console.log(bestSellers)
  return bestSellers.length>0 ? (
      <Carousel fluid>
        {bestSellers.map((obj, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                crossOrigin="anonymous"
                style={{ height: "300px", objectFit: "cover" }}
                src={obj.images? obj.images[0].path: null}
                className="d-block w-100"
              />
              <Carousel.Caption>
                <LinkContainer to={`/product-details/${obj._id}`} style={{ cursor: "pointer" }}>
                  <h3>Best Seller in {obj.Category}</h3>
                </LinkContainer>
                <p>{obj.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    ): null
  
}

export default CarouselComponent;
