import { Link, useNavigate } from "react-router-dom";
// import "../../MainStyle.css";
// import "../Animation.css";
import "./login.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "../../RTK/Slices/AuthSlice";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error, loading, userId } = useSelector((state) => state.auth);

  async function handleLogin(newUserId) {
    const oldUserId = localStorage.getItem('userId');
  
    if (newUserId !== oldUserId) {
      if (oldUserId) {
        localStorage.removeItem(`cart_${oldUserId}`);
        localStorage.removeItem(`favorites_${oldUserId}`);
      }
  
      localStorage.setItem('userId', newUserId);
    }
  
    const newCart = JSON.parse(localStorage.getItem(`cart_${newUserId}`)) || [];
    const newFavorites = JSON.parse(localStorage.getItem(`favorites_${newUserId}`)) || [];
  
    console.log(newCart, newFavorites);
  }
  
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.password) {
      newErrors.error = "Please enter both email and password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginData = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Dispatch the login action from authSlice
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      console.log("Form validation failed");
    }
  };

  useEffect(() => {
    if (token) {
      // Extract userId from localStorage after login
      const newUserId = localStorage.getItem('userId');
      // Call handleLogin function with the newUserId
      handleLogin(newUserId);

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "Go to Home",
        timer: 1500, // Auto-close after 1.5 seconds
        timerProgressBar: true,
        customClass: {
          popup: 'animated tada',
          title: 'text-success',
          confirmButton: 'btn btn-success',
        },
        backdrop: `rgba(0,123,255,0.4) left top no-repeat`,
        didOpen: () => {
          Swal.showLoading(); 
        }
      }).then(() => {
        navigate("/"); // Redirect after success
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        confirmButtonText: "Try Again",
        showClass: {
          popup: 'animate__animated animate__fadeInDown' 
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp' 
        },
        customClass: {
          popup: 'animated shake',
          title: 'text-danger',
          confirmButton: '#0282f9',
        },
        showDenyButton: true,
        denyButtonText: 'Forgot Password?',
        denyButtonColor: '#261F55',
      }).then((result) => {
        if (result.isDenied) {
          navigate('/forgotpassword');
        }
      });
    }
  }, [error]);

  return (
    <div className="login-container" style={{ marginTop: "73px", paddingTop: "20px", height: "100vh",width:"100%" }}>
      <div >
        <div className="container login contact-form" style={{ marginTop: "180px" }}>
          <h2 style={{ marginBottom: "20px", paddingTop: "50px" }}>Sign In</h2>
          <form onSubmit={handleLoginData}>
            <div className="div">
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
                  className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}`}
                  onClick={showPassword}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                ></i>
              </div>
              {errors.password && (
                <small className="errorMesg">{errors.password}</small>
              )}
              {errors.error && (
                <small className="errorMesg">{errors.error}</small>
              )}
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="remember"
                  style={{ width: "" }}
                />
                <label style={{ fontSize: "17px" }} htmlFor="remember">
                  Remember me
                </label>
                <Link
                  style={{
                    fontSize: "17px",
                    marginLeft: "20px",
                    color: "",
                  }}
                  to={"/forgotpassword"}
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                style={styles.btnn}
                className="btn text-center"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <small style={{ fontSize: "17px" }} className="">
                Not Have An Account?
                <Link to="/register" style={{ marginLeft: "6px" }}>
                  Register
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  btnn: {
    borderRadius: "25px",
    backgroundColor: "#242259",
    color: "#fff",
  },
};

export default Login;
