import React from 'react';
import "./profile.css"
import profileImage from "../../Images/abdo.png";
import "../Animation.css";

const Profile = () => {
  return (
    <div className="profile-container" style={{height:"86vh"}}>
      <div className="profile-card contact-form">
        <div className="avatar">
          <img src={profileImage} alt={" imag"}/>
        </div>
        <div className="profile-info">
          <h1>Abdullatif Mostafa</h1>
          <p className="email">Email: <a href="mailto:tifa@gmail.com">tifa@gmail.com</a></p>
          <p className="location">Location: Cairo, Egypt</p>
          <div className="social-links">
          <a href=" "><i className="fa fa-twitter"></i></a>
          <a href=" "><i className="fa fa-linkedin"></i></a>
          <a href=" "><i className="fa fa-github"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
