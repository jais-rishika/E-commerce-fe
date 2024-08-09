import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";
import { setMessageReceived } from "../../redux/actions/chatAction";

export default function AdminChatRoomComponent({
  chatRoom,
  roomIndex,
  socketUser,
  socket
}) {
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
  useState(true);
  const close = (socketId) => {
    window["closeToast" + roomIndex](false);
    socket.emit("admin:closeChat", socketId)
  };
  const [rerender, setRerender] = useState(false);
  const [chat, setChat] = useState([]);
  const chatTextareaRef = useRef(null);
  const dispatch=useDispatch()

  const adminSubmittingMessage = (e, elem) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) return;
    let v = chatTextareaRef.current.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    socket.emit("admin:message", { user: socketUser ,message: v });
    setChat((chat) => {
      return [...chat, { client: v }];
    });
    chatRoom[1].push({ admin: v });
    setRerender(!rerender);
    chatTextareaRef.current.focus();
    dispatch(setMessageReceived(false))
    setTimeout(() => {
      //to make it scroll when admin enters the message
      chatTextareaRef.current.value = "";
      const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  };

  useEffect(() => {
    //to make it scroll when user enters the message
    const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  return (
    <Row>
      <Col md={4} className="mb-4">
        <Toast show={["toast" + roomIndex]} onClose={() => close(chatRoom[0])}>
          <Toast.Header>
            <strong className="me-auto">Chat with User</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <div
              style={{ maxHeight: "300px", overflow: "auto" }}
              className={`cht-msg${socketUser}`}
            >
              {chatRoom[1].map((msg, idx) => {
                return (
                  <Fragment key={idx}>
                    {msg.client && (
                      <p
                        key={idx}
                        className="bg-primary p-2 ms-4 text-light rounded-pill"
                      >
                        <b>User Wrote: </b>
                        {msg.client}
                      </p>
                    )}
                    {msg.admin && (
                      <p key={idx} className="p-1">
                        <b>Admin Wrote: </b>
                        {msg.admin}
                      </p>
                    )}
                  </Fragment>
                );
              })}
            </div>
            <Form.Group className="mb-3" controlId={`adminChatMsg${roomIndex}`}>
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                ref={chatTextareaRef}
                onKeyUp={(e) =>
                  adminSubmittingMessage(e, `adminChatMsg${roomIndex}`)
                }
              />
              <Button
                className="mt-1"
                onClick={(e) =>
                  adminSubmittingMessage(e, `adminChatMsg${roomIndex}`)
                }
              >
                {" "}
                SUBMIT
              </Button>
            </Form.Group>
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
