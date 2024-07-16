import ImageZoom from "js-image-zoom";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import CartAlert from "../components/user/CartAlert";

export default function ProductDetailsPage() {
  const { id } = useParams();
  console.log(id);
  const [show, setShow] = useState(true);
  var options={
    scale:2,
    offset:{vertical: 0, horizontal: 0}
  }
  useEffect(()=>{
    new ImageZoom(document.getElementById("first"),options)
    new ImageZoom(document.getElementById("second"),options)
    new ImageZoom(document.getElementById("third"),options)
    new ImageZoom(document.getElementById("fourth"),options)
  })
  return (
    <Container>
      <CartAlert />
      <Row className="mt-5">
        <Col style={{zIndex: 1}} md={4}>
          <div id="first">
            {" "}
            <Image fluid src="/images/games-category.png" />
          </div>
          <br/>
          <div id="second">
            {" "}
            <Image fluid src="/images/games-category.png" />
          </div>
          <br/>
          <div id="third">
            {" "}
            <Image fluid src="/images/games-category.png" />
          </div>
          <br/>
          <div id="fourth">
            {" "}
            <Image fluid src="/images/games-category.png" />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product name</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Porta ac consectetur ac Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Perferendis, illo.
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger">Add to cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    John Doe <br />
                    <Rating readonly size={20} initialValue={4} />
                    <br />
                    20-09-2001 <br />
                    Porta ac consectetur ac Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Perferendis, illo.
                  </ListGroup.Item>
                ))}
              </ListGroup>
              send review form
              <Alert variant="danger">Login first to write a review</Alert>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Select>
                  <option>Your Rating</option>
                  <option value="5">5 (very good)</option>
                  <option value="4">4 (good)</option>
                  <option value="3">3 (average)</option>
                  <option value="2">2 (bad)</option>
                  <option value="1">1 (awful)</option>
                </Form.Select>
                <Button variant="primary" className="mt-3">
                  Primary
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
