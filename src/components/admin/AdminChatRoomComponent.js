import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

export default function AdminChatRoomComponent() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [showC, setShowC] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  const toggleShowC = () => setShowB(!showC);


  return (
    <Row>
      <Col md={4} className="mb-4">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">Chat with John Doe</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              {Array.from({ length: 30 }).map((_, idx) => {
                return (
                  <Fragment key={idx}>
                    <p className="bg-primary p-2 ms-4 text-light rounded-pill">
                      <b>User Wrote: </b>PROBLEM!!!
                    </p>
                    <p className="p-1">
                      <b>Admin Wrote: </b>NO PROBLEM!!!
                    </p>
                  </Fragment>
                );
              })}
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control as="textarea" rows={2} />
              <Button className="mt-1"> SUBMIT</Button>
            </Form.Group>
          </Toast.Body>
        </Toast>
      </Col>
      <Col md={4} className="mb-4">
        <Toast show={showB} onClose={toggleShowB}>
          <Toast.Header>
            <strong className="me-auto">Chat with John Doe2</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              {Array.from({ length: 30 }).map((_, idx) => {
                return (
                  <Fragment key={idx}>
                    <p className="bg-primary p-2 ms-4 text-light rounded-pill">
                      <b>User Wrote: </b>PROBLEM!!!
                    </p>
                    <p className="p-1">
                      <b>Admin Wrote: </b>NO PROBLEM!!!
                    </p>
                  </Fragment>
                );
              })}
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control as="textarea" rows={2} />
              <Button className="mt-1"> SUBMIT</Button>
            </Form.Group>
          </Toast.Body>
        </Toast>
      </Col>
      <Col md={4} className="mb-4">
        <Toast show={showC} onClose={toggleShowC}>
          <Toast.Header>
            <strong className="me-auto">Chat with John Doe3</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              {Array.from({ length: 30 }).map((_, idx) => {
                return (
                  <Fragment key={idx}>
                    <p className="bg-primary p-2 ms-4 text-light rounded-pill">
                      <b>User Wrote: </b>PROBLEM!!!
                    </p>
                    <p className="p-1">
                      <b>Admin Wrote: </b>NO PROBLEM!!!
                    </p>
                  </Fragment>
                );
              })}
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control as="textarea" rows={2} />
              <Button className="mt-1"> SUBMIT</Button>
            </Form.Group>
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
