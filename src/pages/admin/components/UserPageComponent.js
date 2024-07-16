import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
export default function UserPageComponent({fetchUsers, deleteUser}) {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);

  const deleteHandler = async(userId) =>{
    if(window.confirm("do you want to delete?")){
      const data=await deleteUser(userId);
      if(data==="user deleted"){
        setUserDeleted(!userDeleted);
      }
    }
  } 
  useEffect(() => {
    const abctrl = new AbortController();
    fetchUsers(abctrl)
    .then((res) => setUsers(res))
    .catch((err)=>{
      console.log(err)
    })
    return () => abctrl.abort();
  }, [userDeleted]);
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row className="m-5">
          <Col md={12}>
            <h1>User List</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* ["", ]                 */}
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i className="bi bi-check-lg text-success" />
                      ) : (
                        <i className="bi bi-x-lg text-danger" />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/edit-user/${user._id}`}>
                        <Button>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                      {" / "}
                      <Button variant="danger" onClick={()=>deleteHandler(user._id)}>
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
