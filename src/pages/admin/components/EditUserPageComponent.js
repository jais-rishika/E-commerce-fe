import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditUserPageComponent = ({ fetchUser, updateUserApi }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [adminState, setAdminState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const isAdmin = adminState
    if (event.currentTarget.checkValidity() === true) {
      console.log("update")
      updateUserApi(id, name, lastName, email, isAdmin)
        .then((data) => {
          console.log(data)
          if (data === "user Updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) => {
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setAdminState( data.isAdmin)
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/users" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit User</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={user.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={user.lastName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
              />
            </Form.Group>
            <Form.Check
              name="isAdmin"
              type="checkbox"
              className="mb-3"
              label="Is admin"
              checked={adminState}
              onChange={(e) => {setAdminState(e.target.checked)}}
              
            />
            <Button variant="primary" type="submit">
              Update
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
