import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerUser } from "../../RTK/Slices/AuthSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // توجيه إلى الصفحة الرئيسية عند تسجيل الدخول بنجاح
  const { token, error } = useSelector((state) => state.auth);

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       // تسجيل المستخدم
  //       const response = await dispatch(registerUser({
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //       })).unwrap();

  //       const newUserId = response.user.id; // الحصول على معرف المستخدم من الاستجابة

  //       // تحديث localStorage بعد التسجيل بنجاح
  //       localStorage.setItem('userId', newUserId);
  //       localStorage.setItem(`cart_${newUserId}`, JSON.stringify([])); // قائمة تسوق فارغة
  //       localStorage.setItem(`favorites_${newUserId}`, JSON.stringify([])); // قائمة مفضلات فارغة

  //       Swal.fire({
  //         title: "Welcome!",
  //         text: `Hello, ${formData.username}. Sign-up successful.`,
  //         icon: "success",
  //         confirmButtonText: "Thanks",
  //         showClass: {
  //           popup: 'animate__animated animate__fadeInDown'
  //         },
  //         hideClass: {
  //           popup: 'animate__animated animate__fadeOutUp'
  //         },
  //       }).then(() => {
  //         setFormData({
  //           username: "",
  //           email: "",
  //           password: "",
  //           confirmPassword: "",
  //         });
  //         navigate("/");
  //       });
  //     } catch (error) {
  //       console.error("Registration error:", error);
  //       Swal.fire({
  //         title: "Error!",
  //         text: error.message,
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //         titleColor: "text-danger",
  //         showClass: {
  //           popup: 'animate__animated animate__fadeInDown'
  //         },
  //         hideClass: {
  //           popup: 'animate__animated animate__fadeOutUp'
  //         },
  //       });
  //     }
  //   } else {
  //     console.log("Form validation failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Register user
        const response = await dispatch(registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })).unwrap();
        console.log("response ",response);
        const newUserId = response.user._id; // Ensure that you get the userId from the response
        console.log("newuserId ",newUserId)
        // Update localStorage with valid userId
        localStorage.setItem('userId', newUserId);
        localStorage.setItem(`cart_${newUserId}`, JSON.stringify([])); // Initialize empty cart
        localStorage.setItem(`favorites_${newUserId}`, JSON.stringify([])); // Initialize empty favorites
        
          Swal.fire({
            title: "Welcome!",
            text: `Hello, ${formData.username}. Sign-up successful.`,
            // icon: "success",
            timer: 1500, // Changed to a number
            confirmButtonText: "Thanks",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
          }).then(() => {
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            navigate("/");
          });
        } catch (error) {
          console.error("Registration error:", error); // More descriptive error message
        
          Swal.fire({
            title: "This user already exists",
            icon: "error",
            confirmButtonText: "Try Again",
            customClass: {
              title: "text-danger" // Using customClass for title color
            },
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
          });
        }



    } else {
      console.log("Form validation failed");
    }
  };
  
  return (
    <div className="login-container" style={{  paddingTop: "", height: "100vh" }}>
      <div className="box">
        <div className="container login contact-form">
          <h2 style={{ marginBottom: "20px", paddingTop: "20px" }}> Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="div">
              {/* Username */}
              <div>
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              {/* Email */}
              <div>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <small className="errorMesg">{errors.email}</small>
              )}
              {/* Password */}
              <div>
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <i
                  className={`fa ${
                    passwordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={showPassword}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                ></i>
              </div>
              {errors.password && (
                <small className="errorMesg">{errors.password}</small>
              )}
              {/* Confirm Password */}
              <div>
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <i
                  className={`fa ${
                    confirmPasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={showConfirmPassword}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                ></i>
              </div>
              {errors.confirmPassword && (
                <small className="errorMesg">{errors.confirmPassword}</small>
              )}
              <small className="">
                Already have an account?{" "}
                <Link style={{ color: "", marginLeft: "6px" }} to="/login">
                  Sign in
                </Link>
              </small>
              <button
                className="btn text-light text-center"
                style={{ borderRadius: "25px", backgroundColor: "#242259" }}
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
