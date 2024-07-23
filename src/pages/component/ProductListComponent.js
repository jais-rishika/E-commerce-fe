import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import AttributeFilterComponent from "../../components/filterQueryResultOptions/AttributeFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import PaginationComponents from "../../components/user/PaginationComponents";
import ProductForListComponent from "../../components/user/ProductForListComponent";
import SortOptionsComponent from "../../components/user/SortOptionsComponent";

export default function ProductListComponent({fetchProducts}) {
const [product,setProduct]=useState([])
  useEffect(()=>{
      fetchProducts()
      .then((prod)=> setProduct(prod.products))
      .catch((err)=> console.log(err))
  },[])
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              Filter: <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributeFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" className="mt-1 w-50 ">
                Filter
              </Button>
              <br />
              <Button variant="danger" className="mt-1 w-50 ">
                Reset Filters
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {product.map((product) => (
            <ProductForListComponent
              key={product._id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviewsNumber={product.reviewsNumber}
              productId={product._id}
            />
          ))}
          <PaginationComponents />
        </Col>
      </Row>
    </Container>
  );
}
