import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function UserOrderComponent({ getOrder }) {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrder()
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>You</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <Link style={{cursor:"pointer"}} to={`/user/my-order-details/${order._id}`}>go to order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
