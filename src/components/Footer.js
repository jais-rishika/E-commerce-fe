import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function Footer() {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="bg-dark text-white text-center py-5">
            Copyright &copy; E-Commerce
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
