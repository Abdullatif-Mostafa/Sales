import React, { useState, useEffect, useRef } from "react";
import {Container,Row,Col,Card,Form,InputGroup,Button,Spinner,
} from "react-bootstrap";
import { FaPaperPlane, FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import moment from "moment";

const initialMessages = [
  {
    id: 1,
    sender: "customer",
    message: "Hello, I need help with my order.",
    time: "2 mins ago",
  },
  {
    id: 2,
    sender: "helper",
    message: "Sure, I can help you with that. What seems to be the problem?",
    time: "1 min ago",
  },
];

const getHelperResponse = (message) => {
  if (message.includes("order")) {
    return "I see. Let me check your order status.";
  } else if (message.includes("refund")) {
    return "Sure, I can help you with the refund process.";
  } else if (message.includes("issue")) {
    return "I'm sorry to hear that you're experiencing an issue. Could you please provide more details?";
  } else if (message.includes("product")) {
    return "Can you specify which product you are referring to?";
  } else {
    return "Thank you for reaching out. How can I assist you further?";
  }
};

const CommunicationPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isHelperTyping, setIsHelperTyping] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const messageListRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "customer",
        message: newMessage,
        time: moment().fromNow(),
        status: "sent",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");

      // Simulate helper response
      setTimeout(() => {
        setIsHelperTyping(true);
        setTimeout(() => {
          const helperResponse = {
            id: messages.length + 2,
            sender: "helper",
            message: getHelperResponse(newMessage),
            time: moment().fromNow(),
            status: "read",
          };
          setMessages((prevMessages) => [...prevMessages, helperResponse]);
          setIsHelperTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleEndChat = () => {
    setMessages([]);
    setChatEnded(true);
  };

  const handleStartNewChat = () => {
    setMessages(initialMessages);
    setChatEnded(false);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div s
    style={{marginTop:"77px",paddingTop:"",height:"auto"}}    >
      <Container className="mt-5">
        <Row>
          {/* <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Chats</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item active>
                  Support Chat <Badge bg="danger">{messages.length}</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col> */}
          <Col md={8} style={{margin:"10px auto"}}>
            <Card className="shadow-md">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Support Chat</h5>
                {!chatEnded && (
                  <Button variant="outline-secondary" size="sm" onClick={handleEndChat}>
                    End Chat
                  </Button>
                )}
              </Card.Header>
              <Card.Body
                className="d-flex flex-column"
                style={{ height: "400px", overflowY: "scroll" }}
                ref={messageListRef}
              >
                {chatEnded ? (
                  <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <h5>Chat has ended. Thank you for reaching out!</h5>
                    <Button variant="primary" onClick={handleStartNewChat} className="mt-3">
                      Start New Chat
                    </Button>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`d-flex mb-3 ${
                        msg.sender === "customer"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded ${
                          msg.sender === "customer"
                            ? "bg-primary text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        <div className="d-flex justify-content-between">
                          <div>{msg.message}</div>
                          {msg.sender === "customer" && (
                            <div className="ms-2">
                              {msg.status === "sent" && <FaCheck />}
                              {msg.status === "read" && <FaCheckDouble />}
                            </div>
                          )}
                        </div>
                        <small className="text-muted">{msg.time}</small>
                        <FaTrash
                          className="text-danger ms-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteMessage(msg.id)}
                        />
                      </div>
                    </div>
                  ))
                )}
                {isHelperTyping && !chatEnded && (
                  <div className="d-flex mb-3 justify-content-start">
                    <div
                      className="p-3 rounded bg-light text-dark"
                      style={{ maxWidth: "70%" }}
                    >
                      <Spinner animation="grow" size="sm" /> Helper is typing...
                    </div>
                  </div>
                )}
              </Card.Body>
              {!chatEnded && (
                <Card.Footer className="d-flex">
                  <InputGroup>
                    <Form.Control
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button variant="primary" onClick={handleSendMessage}>
                      <FaPaperPlane />
                    </Button>
                  </InputGroup>
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CommunicationPage;
