import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className=" mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Do not logout"
                type="checkbox"
                controlId="formcheck"
                name="donotlogout"
              />
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Don't have an account?
                <Link to={"/register"}>Register</Link>
              </Col>
            </Row>
            <Button type="submit" className="mb-2">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Login
            </Button>
            <Alert show={true} variant="danger">
              User with email does not Exist
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
