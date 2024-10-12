import React, { useEffect, useState } from 'react';
import "./profile.css"
// import profileImage from "../../Images/abdo.png";
import "../Animation.css";

const Profile = () => {
  const [user,setUser]=useState()
  useEffect(()=>{
    const user=localStorage.getItem('user')
    console.log(user)
    if(!user){
      window.location.href="/login"
    }
    else
    {
      const obj=JSON.parse(user)
      setUser(obj)
    
    }
  },[])
  console.log(user)
  return (
    <div className="profile-container" style={{height:"86vh"}}>
      <div className="profile-card contact-form">
        <div className="avatar">
          <img src={user?.avatar} alt={" imag"}/>
        </div>
        <div className="profile-info">
          <h1>{user?.username}</h1>
          <p className="email">Email: <a href="mailto:tifa@gmail.com">{user?.email}</a></p>
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
