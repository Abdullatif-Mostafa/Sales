import React, { useState } from "react";
import {Container,Row,Col,Form,Button,Card,InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { logout } from "../../RTK/Slices/AuthSlice";
import bcrypt from "bcryptjs";
// import axios from"axios";

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const User = useSelector((state) => state.auth?.user);
  // console.log("user ", User);
  const User=localStorage.getItem("user")
  const oldPassword = User?.password;
  console.log(" oldPassword ", oldPassword);

  // console.log(" email ", User.email);
  // console.log(" id ", User._id);

  if (!User) {
    return <div>Loading...</div>;
  }

  if (!oldPassword) {
    Swal.fire({
      text: "Current password is not available",
      // icon: "error",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    return;
  }
  
  const handlePasswordChange = async (event) => {
    event.preventDefault();

    try {
      // التحقق من أن الباسورد الحالي صحيح
      console.log(" ayfsd ",currentPassword,oldPassword)
      const isMatch = await bcrypt.compare(currentPassword, oldPassword);
      if (!isMatch) {
        Swal.fire({
          text: "Invalid Current Password",
          // icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        Swal.fire({
          text: "Passwords do not match!",
          // icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        return;
      }

      // إرسال طلب لتحديث الباسورد الجديد إلى الخادم
      const response = await fetch(`https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Users/${User._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      console.log("data ", data);
      if (response.ok && data.success) {
        Swal.fire({
          text: "Password updated successfully!",
          // icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        });
      } else {
        Swal.fire({
          text: "Password update failed!",
          // icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        text: "An unexpected error occurred!",
        // icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  const handelDeleteAccount = async () => {
    Swal.fire({
      title: "Delete Account",
      // icon: "warning",
      text: "Are You Sure Want To Delete Your Account?",
      showCancelButton: true,
      confirmButtonText: "Yes ",
      confirmButtonColor: "#f00",
      cancelButtonText: "No ",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // إرسال طلب حذف الحساب إلى الخادم
          const response = await fetch(`https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Users/${User._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            Swal.fire({
              text: "The account has been deleted successfully!",
              // icon: "success",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            }).then(() => {
              // تسجيل الخروج بعد حذف الحساب
              dispatch(logout());
              navigate("/register");
            });
          } else {
            Swal.fire({
              text: "Failed to delete the account!",
              // icon: "error",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          Swal.fire({
            text: "An unexpected error occurred!",
            // icon: "error",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      }
    });
  };
  
  const togglePasswordVisibility = (setter, current) => {
    setter(!current);
  };
  return (
    <div
      style={{
        marginTop: "77px",
        backgroundColor: "",
        paddingTop: "1px",
        minHeight: "100vh",
      }}
    >
      <Container className="mt-5">
        <h2 style={{ marginTop: "10px" }}>Security Settings</h2>
        <Row className="mt-4">
          <Col sm={12} md={6}>
            <Card style={{ backgroundColor: "#EEEFF3" ,marginBottom:"15px"}}>
              <Card.Body>
                <Card.Title>Change Password</Card.Title>
                <Form onSubmit={handlePasswordChange}>
                  <Form.Group
                    controlId="currentPassword"
                    style={{ backgroundColor: "inherit" }}
                    className="mt-3"
                  >
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={() =>
                          togglePasswordVisibility(
                            setShowCurrentPassword,
                            showCurrentPassword
                          )
                        }
                      >
                        <i
                          className={`fa ${
                            showCurrentPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="newPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={() =>
                          togglePasswordVisibility(
                            setShowNewPassword,
                            showNewPassword
                          )
                        }
                      >
                        <i
                          className={`fa ${
                            showNewPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword" className="mt-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={() =>
                          togglePasswordVisibility(
                            setShowConfirmPassword,
                            showConfirmPassword
                          )
                        }
                      >
                        <i
                          className={`fa ${
                            !showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    className="mt-3"
                    type="submit"
                    style={{
                      backgroundColor: "#261F55",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    Update Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div
              className=" rounded"
              style={{
                height: "150px",
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "10px",
                backgroundColor: "#EEEFF3",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>Delete Account</h3>
              <button
                className="btn btn-outline-danger"
                onClick={handelDeleteAccount}
                style={{ width: "fit-content", marginBottom: "5px" }}
              >
                Delete My Account
              </button>
              <small style={{ color: "GrayText" }}>
                We are sad to see you go, hope to see you again!
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SecuritySettings;
