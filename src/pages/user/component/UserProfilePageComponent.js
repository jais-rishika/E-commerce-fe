import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

export default function UserProfilePageComponent({
  updateUserApi,
  fetchUserApi,
  userInfo,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage
}) {
  const [userState, setUserState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const [passwordMatchState, setPasswordMatchState] = useState(true);
  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      setPasswordMatchState(true);
    } else {
      setPasswordMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const phonenumber = form.phonenumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const ZIPcode = form.ZIPcode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.confirmPassword.value
    ) {
      setUserState({
        loading: true,
      });
      updateUserApi(
        name,lastName,phonenumber,address,country,ZIPcode,city,state,password
      )
        .then((data) => {
          setUserState({
            success: data.success,
            loading: false,
            error: "",
          });
          reduxDispatch(setReduxUserState({doNotLogout: userInfo.doNotLogout,...data.userUpdated}));
          if(userInfo.doNotLogout){
            localStorage.setItem("userInfo",
          JSON.stringify({doNotLogout: true,...data.userUpdated}))
          }
          else{
            sessionStorage.setItem("userInfo",
          JSON.stringify({doNotLogout: false.doNotLogout,...data.userUpdated}))
          }
        })
        .catch((er) => {
          setUserState({
            error: "something went wrong",
            loading: false,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUserApi(userInfo.id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, []);

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
                name="name"
                defaultValue={user.name}
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
                name="lastName"
                defaultValue={user.lastName}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                disabled
                value={`${user.email} | If you want to change Email, remove account or create a new one`}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formphone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phonenumber"
                type="text"
                placeholder="Enter Phone number"
                defaultValue={user.phonenumber}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formaddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter your Street name and house no."
                defaultValue={user.address}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formcountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Enter Country"
                defaultValue={user.country}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your country
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formzip">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                name="ZIPcode"
                type="text"
                placeholder="Enter ZIP Code"
                defaultValue={user.ZIPcode}
              />
              <Form.Control.Feedback type="invalid">
                Please enter ZIP code
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formcity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Enter City"
                defaultValue={user.city}
              />
              <Form.Control.Feedback type="invalid">
                Please enter City
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formstate">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                type="text"
                placeholder="Enter State"
                defaultValue={user.state}
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
                isInvalid={!passwordMatchState}
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
                name="confirmPassword"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordMatchState}
              />
              <Form.Control.Feedback type="invalid">
                The passwords do not match
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="mb-2">
              {userState && userState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Update
            </Button>
            <Alert
              show={userState && userState.success === "user updated"}
              variant="info"
            >
              User Updated
            </Alert>
            <Alert show={userState && userState.error !== ""} variant="danger">
              Something went wrong
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
