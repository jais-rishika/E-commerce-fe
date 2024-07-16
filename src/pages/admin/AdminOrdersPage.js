import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
export default function AdminOrdersPage() {
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
                {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
                  (item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>Mark Twain</td>
                      <td>2022-09-12</td>
                      <td>$124</td>
                      <td>
                        <i className={item}></i>
                      </td>
                      <td>PayPal</td>
                      <td>
                        <Link to="/admin/order-product">go to order</Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
