import React, { useState } from "react";
import {Dropdown,DropdownButton,Container,Row,Col} from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import Swal from "sweetalert2";

const notificationsList = [
  {
    id: 1,
    type: "success",
    message: "Your order #1234 has been shipped!",
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "danger",
    message: "Payment for order #1235 failed.",
    time: "5 mins ago",
  },
  {
    id: 3,
    type: "warning",
    message: "Your cart is about to expire.",
    time: "10 mins ago",
  },
  {
    id: 4,
    type: "info",
    message: "New promotions are available!",
    time: "15 mins ago",
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsList);
  const handleDismiss = (id) => {
    // const foundedNotification=notifications.filter(notification => notification.id !== id)
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this notification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const foundedNotification=notifications.filter(notification => notification.id !== id)
        setNotifications(foundedNotification);
        Swal.fire("Deleted!", "Your notification has been deleted.", "success");
      }
    });
  };

  const clearAllNotifications = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear all notifications?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear all!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications([]);
        Swal.fire(
          "Cleared!",
          "All notifications have been cleared.",
          "success"
        );
      }
    });
  };

  return (
    <div
      style={{
        marginTop: "60px",
        paddingBottom: "30px",
        paddingTop: "4px",
        minHeight: "100vh",
        
      }}
    >
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Notifications</h2>
              <div className="">
                {/* <h1>{notifications.length}</h1> */}
                <DropdownButton
                  drop="start"
                  variant="outline-secondary"
                  title={<FaBell size={24} />}
                  id="notification-dropdown"
                  align="end"
                ></DropdownButton>
              </div>
            </div>
            {/* </div> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                <>
                  <Dropdown.Item
                    key={notification.id}
                  >
                    <div style={{}} className={`alert alert-${notification.type} mb-0`}>
                      <div style={{animation:"slideLeft 1s ease-in-out",display:"flex",justifyContent:"space-between"}}>
                        <strong>{notification.message}</strong>
                        <button
                      onClick={() => {handleDismiss(notification.id)}}
                      className="btn-close float-start mb-3"
                      aria-label="Close"
                    ></button>
                      </div>
                      <hr/>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                    <br/>
                  </Dropdown.Item>
                </>
                ))
              ) : (
                <Dropdown.Item style={{fontSize:"30px" ,marginTop:"30px"}}>No notifications</Dropdown.Item>
              )}
            </div>
          
          </Col>
        </Row>
        <Row>
       
          <Col>
          {notifications.length>0 ?(
            <button onClick={clearAllNotifications} className="btn btn-danger d-flex justify-content-center m-auto"> Clear Notifications</button>
          ):null
            }
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotificationsPage;
