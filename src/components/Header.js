import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { getCategories } from "../redux/actions/categoryActions";
import { removeChatroom, setChatRooms, setMessageReceived, setSocket } from "../redux/actions/chatAction";
import { logout } from "../redux/actions/userActions";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);

  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };

  useEffect(()=>{
    if(userInfo.isAdmin){
      var audio=new Audio("/audio/chat-msg.mp3")
      const socket = socketIOClient()
      socket.emit("server:admin-connected", "Admin" + Math.floor(Math.random() * 1000000000000));
      socket.on("server:client-admin-message",({user,message})=>{
      dispatch(setSocket(socket))
      //   let chatRooms = {
      //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
      //   };
      dispatch(setChatRooms(user, message));  
      dispatch(setMessageReceived(true))
      audio.play()
      })
      socket.on("disconnected",({reason,socketId})=>{
        // console.log("socketid"+socketId)
        dispatch(removeChatroom(socketId))
      })
      return ()=> socket.disconnect()
    }
  },[userInfo.isAdmin])
  
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
              <DropdownButton
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category, id) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => setSearchCategoryToggle(category.name)}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Form.Control
                type="text"
                onKeyDown={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in shop..."
              />
              <Button variant="warning" onClick={submitHandler}>
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>Admin
                {messageReceived && <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <>
                <NavDropdown
                  title={`${userInfo.name} ${userInfo.lastName}`}
                  id="collasible-nav-dropdown"
                >
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
                      {itemsCount === 0 ? "" : itemsCount}
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
