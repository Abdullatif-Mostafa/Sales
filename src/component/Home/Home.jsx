import React from "react";
import Card from "react-bootstrap/Card";
import image1 from "../../Images/img1.jpg";
import "./home.css"
// import image1 from "../../Images/sales.jpg"

const Home = () => {
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
