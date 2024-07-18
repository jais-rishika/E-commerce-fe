import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";

function AdminLinksComponent() {
  const dispatch=useDispatch()
  return (
    <Navbar bg="light" variant="light">
      <Nav defaultActiveKey="/home" className="flex-column">
        <LinkContainer to="/admin/orders">
          <Nav.Link>Orders</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>Products</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/users">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/chats">
          <Nav.Link>Chats</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/analytics">
          <Nav.Link>Analytics</Nav.Link>
        </LinkContainer>
        <Nav.Link onClick={()=>{
          dispatchEvent(logout())
        }}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default AdminLinksComponent;
