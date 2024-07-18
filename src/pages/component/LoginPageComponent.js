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
import { Link, useNavigate } from "react-router-dom";

export default function LoginPageComponent({ logInUser,reduxDispatch, setReduxUserState  }) {
  const [validated, setValidated] = useState(false);
  const [userLoginResponse, setUserLoginResponse] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.value;
    if (event.currentTarget.checkValidity() === true && email && password) {
      setUserLoginResponse({
        loading: true,
      });
      console.log("run2");
      logInUser(email, password, doNotLogout)
        .then((res) => {
          setUserLoginResponse({
            success: res.success,
            loading: false,
            error: "",
          });
          if(res.userLoggedIn){
            reduxDispatch(setReduxUserState(res.userLoggedIn))
          }
          if (res.success === "User Logged in" && !res.userLoggedIn.isAdmin) {
            navigate("/user", { replace: true });
          } else {
            navigate("/admin/orders", { replace: true });
          }
        })
        .catch((er) => {
          setUserLoginResponse({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className=" mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlid="formemail">
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
            <Form.Group className="mb-3" controlid="formpassword">
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
                label="Do not logout"
                type="checkbox"
                controlid="fromCheck"
                name="doNotLogout"
              />
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Don't have an account?
                <Link to={"/register"}>Register</Link>
              </Col>
            </Row>
            <Button type="submit" className="mb-2">
              {userLoginResponse && userLoginResponse.loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Login
            </Button>

            <Alert
              show={
                userLoginResponse &&
                userLoginResponse.error === "wrong credentials"
              }
              variant="danger"
            >
              Wrong Credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
