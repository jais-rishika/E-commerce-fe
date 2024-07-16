import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import AttributeFilterComponent from "../components/filterQueryResultOptions/AttributeFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import PaginationComponents from "../components/user/PaginationComponents";
import ProductForListComponent from "../components/user/ProductForListComponent";
import SortOptionsComponent from "../components/user/SortOptionsComponent";

export default function ProductListPage() {
  axios.get("/api/v1/products/")
  .then((res) => console.log(res))
  .catch((err)=>{
    console.log(err)
  });

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
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductForListComponent
              key={idx}
              images={["games", "monitors", "tablets", "games", "monitors"]}
              idx={idx}
            />
          ))}
          <PaginationComponents />
        </Col>
      </Row>
    </Container>
  );
}
