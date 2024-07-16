import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CartAlert() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>The product is added to the cart</Alert.Heading>
          <div>
            <LinkContainer to="/">
              <Button variant="success">Go back</Button>
            </LinkContainer>
            {" "}
            <LinkContainer to="/cart">
              <Button variant="danger">Go to Cart</Button>
            </LinkContainer>
          </div>
        </Alert>
      )}
    </>
  );
}

export default CartAlert;
