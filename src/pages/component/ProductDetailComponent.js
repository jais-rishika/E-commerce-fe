import ImageZoom from "js-image-zoom";
import React, { useEffect, useRef, useState } from "react";
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
import MetaComponent from "../../components/MetaComponent";
import CartAlert from "../../components/user/CartAlert";
export default function ProductDetailComponent({
  ReduxAddToCart,
  reduxDispatch,
  fetchProductDetails,
  writeReviewApiRequest,
  userInfo,
}) {
  const { id } = useParams();
  const [selectQuantity, setSelectQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);
  const messageEndRef=useRef(null)

  const addToCartHandler = () => {
    reduxDispatch(ReduxAddToCart(id, selectQuantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if(productReviewed){
      setTimeout(()=>{
        messageEndRef.current.scrollIntoView({behavior: "smooth"})
      },100)
    }
  },[productReviewed])

  useEffect(() => {
    if (product.images) {
      var options = {
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };
      product.images.map((image, idx) => 
        new ImageZoom(document.getElementById(`imageId${idx + 1}`), options)
      );
    }
  });

  useEffect(() => {
    fetchProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id,productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    }
    if (e.currentTarget.checkValidity() === true) {
      console.log(true)
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          console.log(data)
          if (data === "review created") {
            setProductReviewed("Thank You for Reviewing the Product!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  }
  return (
    <>
    <MetaComponent title={product.name} description={product.description}/>
    <Container>
      <CartAlert
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {loading ? (
          <h2>Loading product details ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              {product.images
                ? product.images.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          fluid
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                ))
                : <h2>This Product has no image</h2>}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />{" "}
                      ({product.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>{product.count > 0 ? "in stock" : "out of stock"}</ListGroup.Item>
                    <ListGroup.Item>
                      Price: <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Quantity:
                      <br />
                      <br />
                      <Form.Select
                        size="sm"
                        onChange={(e) => {
                          setSelectQuantity(e.target.value);
                        }}
                        value={selectQuantity}
                        aria-label="Default select example"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        style={{ cursor: "pointer" }}
                        variant="danger"
                        onClick={addToCartHandler}
                      >
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mt-5">
                  <h5>REVIEWS</h5>
                  <ListGroup variant="flush">
                    {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.name} <br />
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          />
                          <br />
                          {review.createdAt.substring(0, 10)}
                          <br />
                          {review.comment}
                        </ListGroup.Item>
                      ))}
                      <div ref={messageEndRef}></div>
                  </ListGroup>
                  {!userInfo.name && (
                    <Alert variant="danger">
                      Login first to write a review
                    </Alert>
                  )}

                  <Form onSubmit={(e)=>sendReviewHandler(e)}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Write a Review</Form.Label>
                      <Form.Control
                        name="comment"
                        required
                        as="textarea"
                        rows={3}
                        disabled={!userInfo.name}
                      />
                    </Form.Group>
                    <Form.Select
                      name="rating"
                      required
                      disabled={!userInfo.name}
                      aria-label="Default select example"
                    >
                      <option>Your Rating</option>
                      <option value="5">5 (very good)</option>
                      <option value="4">4 (good)</option>
                      <option value="3">3 (average)</option>
                      <option value="2">2 (bad)</option>
                      <option value="1">1 (awful)</option>
                    </Form.Select>
                    <Button
                      disabled={!userInfo.name}
                      type="submit"
                      variant="primary"
                      className="mt-3"
                    >
                      Submit Review
                    </Button>
                    {productReviewed}
                  </Form>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </Container>
    </>
  );
}
