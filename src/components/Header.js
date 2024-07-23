import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="Search in shop..." />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>Admin </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <>
                <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    eventKey="/user/my-order"
                    as={Link}
                    to="/user/my-order"
                  >
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <Badge pill bg="danger">
                      2
                    </Badge>
                    <i className="bi bi-cart-dash"></i>
                    <span className="ms-1">Cart</span>
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
