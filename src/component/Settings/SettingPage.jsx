import React from "react";
import "../../MainStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../RTK/Slices/AuthSlice";
import "./settings.css"
import Swal from "sweetalert2";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Do You Want to Logout ?',
      icon: 'question',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown' 
              },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp' },
    }).then((data) => {
      if (data.isConfirmed) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <div className="settings-page">
      <div className="mainSetting">
      <div className="d-flex align-items-center "style={{marginBottom:"25px"}}>
        <Link to={"/"}>
          <i className="fa fa-arrow-left text-black"></i>
        </Link>
        <h3 className="text-align-center m-auto">Settings</h3>
      </div>
      <div className="position-relative " style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <input
          type="text"
          className="form-control  fs-5 fa fa-search"
          placeholder="Search for a setting..."
          style={{ color: "#707070" }}
        ></input>
        <i
          className="fa fa-search position-absolute"
          style={{ top: "",marginRight:"8px" ,right: "0", color: "#ccc" }}
        ></i>
      </div>
    <br></br>
      <Link
        to={"/Profile"}
        className="settings-section text-decoration-none text-black"
      >
        <p>
          <i className="fa fa-user"></i> Account
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr></hr>
      <Link
        to={"/CommunicationPage"}
        className="settings-section text-decoration-none text-black"
      >
        <p>
        <i class="fa fa-comment"></i>
          {/* <FaRocketchat style={{ color: "white",backgroundColor:"black" }} />  */}
          Communication with us
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr></hr>
      <Link to="/NotificationsPage" className="settings-section">
        <p>
          <i className="fa fa-bell"></i> Notifications
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr></hr>
      <Link to={"/PrivacyAndSecurity"} className="settings-section">
        <p>
          <i className="fa fa-lock"></i> Privacy and Security
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr />
      <Link to="/helpPage" className="settings-section">
        <p>
          <i className="fa fa-question-circle"></i> Help and Support
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr />
      <Link to="/AdvancedTermsOfService" className="settings-section">
        <p style={{ display: "flex",justifyContent:"center",alignItems:"center", gap: "15px" }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width={"16px"}
            height={"16px"}
            
            viewBox="0 0 384 512">
            <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
          Terms Of Service
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr />
      <Link to={"/about"} className="settings-section">
        <p>
          <i className="fa fa-info-circle"></i> About
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      <hr />
      <Link onClick={handleLogout} className="settings-section">
        <p>
          <i className="fa fa-sign-out"></i>Logout
        </p>
        <p>
          <i className="fa fa-chevron-right"></i>
        </p>
      </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
