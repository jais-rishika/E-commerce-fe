import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";
export default function ProductForListComponent({images,name,description,price,rating,reviewsNumber,productId}) {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img crossOrigin="anonymous" variant="top" src={images[0]? images[0].path:""} />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              {price}{" "}
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="danger">See product</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
