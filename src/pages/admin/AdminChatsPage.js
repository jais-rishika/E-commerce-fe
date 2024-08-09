import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
export default function AdminChatsPage() {
  const { chatRooms , socket} = useSelector((state) => state.adminChat);
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, idx) => (
            <AdminChatRoomComponent key={idx} chatRoom={chatRoom} 
              roomIndex={idx+1} socketUser={chatRoom[0]} socket={socket}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
}
