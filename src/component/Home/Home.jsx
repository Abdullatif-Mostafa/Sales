import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import image1 from "../../Images/img1.jpg";
import "./home.css"
// import image1 from "../../Images/sales.jpg"
console.log("logging");

const login = async () => {
    const response = await fetch('https://tarmeezacademy.com/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "username": "ali1234@gmail.com",
            "password": "123456"
        })
    });
    const data = await response.json();
    console.log("data ",data);
    return data;
}
// login();
// register
const register = async () => {
  const response = await fetch('https://tarmeezacademy.com/api/v1/register'
    , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
          "username": "ayhaga",
          "name":"ayhaga",
          "email": "ayhaga12@gmail.com",
          "password": "123456",
          })
          });
          const data = await response.json();
          console.log("data ",data);
          return data;
          }
          // register();
const Home = () => {
  useEffect(()=>{
    register();
    login();
    console.log(" loging");
    
  },[])
  return (
    <Card className="border-0 text-dark" style={{ marginTop: "76px" }}>
      <Card.Img
        src={image1}
        className="card-img"
        alt="Card image"
        style={{ height: "auto", maxHeight: "100vh" }} // Adjust image height
      />
      <Card.ImgOverlay
        className="d-flex align-items-center"
        style={{ 
          display: "flex", 
          justifyContent: "flex-start", 
          textAlign: "",
          padding: "0 1rem" // Add padding for better text alignment
        }}
      >
        <div className="container">
          <Card.Title className="display-3 fw-bolder mb-0" style={{ color: "#242259" }}>
            NEW SEASON ARRIVALS
          </Card.Title>
          <Card.Text className="fs-2 mt-3">
            CHECK OUT ALL THE TRENDS
          </Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Home;
