import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChange=()=>{
    const password=document.querySelector("input[name=password]")
    const confirm=document.querySelector("input[name=confirmpassword]")
    if(confirm.value === password.value){
      confirm.setCustomValidity("")
    }
    else{
      confirm.setCustomValidity("Passwords do not match")
    }

  }
  return (
    <Container>
      <Row className=" mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formfirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your first name"
                name="firstname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formlastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>Email Address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the email
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                name="password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter atleast 6 digit password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formrepeatpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Confirm Password"
                name="confirmpassword"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                The passwords do not match
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Do you already have an account?
                <Link to={"/login"}>Login</Link>
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
              Register
            </Button>
            <Alert show={true} variant="danger">
              User with email already exist
            </Alert>
            <Alert show={true} variant="info">
              User Created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
