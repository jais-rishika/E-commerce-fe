import { Alert, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CartAlert({showCartMessage,setShowCartMessage}) {
  const navigate=useNavigate()
  const goBack=()=>{
    navigate(-1)
  }
  return (
    <>
      {showCartMessage && (
        <Alert variant="danger" onClose={() => setShowCartMessage(false)} dismissible>
          <Alert.Heading>The product is added to the cart</Alert.Heading>
          <div>
            <LinkContainer to="/">
              <Button variant="success" onClick={goBack}>Go back</Button>
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
