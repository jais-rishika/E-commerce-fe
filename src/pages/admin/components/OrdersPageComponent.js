import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
export default function OrdersPageComponent({ fetchOrders }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrders(abctrl)
      .then((res) => setOrders(res))
      .catch((er) => {
        setOrders([
          {
            name: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          },
        ]);
      });
    return () => abctrl.abort();
  }, []);
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row className="m-5">
          <Col md={12}>
            <h1>My Orders</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Delivered</th>
                  <th>Payment Method</th>
                  <th>Order details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      {item.name!==null?(
                      <>
                        {item.user.name} {item.user.lastName}
                      </>
                      ):null}
                    </td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>{item.orderTotal.cartSubtotal}</td>
                    <td>
                      {item.isDelivered ? (
                        <i className="bi bi-check-lg text-success" />
                      ) : (
                        <i className="bi bi-x-lg text-danger" />
                      )}
                    </td>
                    <td>{item.paymentMethod}</td>
                    <td>
                      <Link to={`/admin/order-details/${item._id}`}>
                        go to order
                      </Link>
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
