import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row
} from "react-bootstrap";
export default function UserProfilePage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmpassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };
  return (
    <Container>
      <Row className=" mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>User Profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formfirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstname"
                defaultValue="John"
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
                name="lastname"
                defaultValue="Doe"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                disabled
                value="johndoe@gmail.com | If you want to change Email, remove account or create a new one"
              />
              <Form.Control.Feedback type="invalid">
                Please enter the email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formphone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone number"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formaddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Street name and house no."
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formcountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter your country
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formzip">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ZIP Code"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter ZIP code
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formcity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter City
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formstate">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please enter State
              </Form.Control.Feedback>
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

            <Button type="submit" variant="primary" className="mb-2">
              Update
            </Button>
            <Alert show={true} variant="danger">
              User with email already exist
            </Alert>
            <Alert show={true} variant="info">
              User Updated
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
