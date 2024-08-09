import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import "./chat.css";
export default function UserchatComponents() {
  
  const [socket, setSocket] = useState(false);
  const [chat, setChat] = useState([]);
  const [messageReceived, setMessageReceived] = useState(false);

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const chatMessagesRef = useRef(null);
  const chatTextareaRef = useRef(null);
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  const [reconnect, setReconnect] = useState(false);
  
  useEffect(() => {
    if (!userInfo.isAdmin) {
      setReconnect(false)
      var audio=new Audio("/audio/chat-msg.mp3")
      const sket = socketIOClient();
      sket.on("server:no-admin",(msg)=>{
        setChat((chat)=>{
          return [...chat,{admin: "no admin here now"}]
        })
      })
      sket.on("server:admin-client-message", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: msg }];
        });
        setMessageReceived(true)
        audio.play()
        chatMessagesRef.current.scrollTop =chatMessagesRef.current.scrollHeight;
      });
      setSocket(sket);
      sket.on("admin closed chat",()=>{
        setChat([])
        setChatConnectionInfo("Admin closed chat. Type something and submit to reconnect")
        setReconnect(true);
      })
      return () => sket.disconnect();
    }
  }, [userInfo.isAdmin, reconnect]);

  const clientSubmittingChatMessage = (e) => {
    if (e.keyCode && e.keyCode != 13) {
      return;
    }
    setMessageReceived(false )
    let v = chatTextareaRef.current.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    setChatConnectionInfo("");
    socket.emit("client:message", v);
    setChat((chat) => {
      return [...chat, { client: v }];
    });
    chatTextareaRef.current.focus();
    setTimeout(() => {
      chatTextareaRef.current.value = "";
      // const chatMessages = document.querySelector(".cht-msg");
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, 100);
  };

  return !userInfo.isAdmin ? (
    <div>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        {messageReceived && <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
}
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Lets's Chat</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg" ref={chatMessagesRef}>
           <p>{chatConnectionInfo}</p>
            {chat.map((msg, id) => (
              <Fragment key={id}>
                {msg.client && (
                  <p key={id}>
                    <b>You wrote:</b> {msg.client}
                  </p>
                )}
                {msg.admin && (
                  <p className="bg-primary p-2 ms-3 text-light rounded-pill" key={id}>
                    <b>Support wrote:</b> {msg.admin}
                  </p>
                )}
              </Fragment>
            ))}
          </div>
          <textarea
            ref={chatTextareaRef}
            onKeyUp={(e) => clientSubmittingChatMessage(e)}
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>

          <button
            onClick={(e) => clientSubmittingChatMessage(e)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
