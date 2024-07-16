import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function CategoryCardComponent({ category, idx }) {
  return (
    <Card>
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        src="/images/tablets-category.png"
      />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to="/product-list">
          <Button variant="primary" className="w-100">
            Go to Category
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;
