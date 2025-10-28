import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFemale, FaMale, FaGem, FaLaptop } from 'react-icons/fa';
import { useNavigate } from 'react-router';
// import "../../MainStyle.css"

const CategoryCard = () => {
    const navigate=useNavigate()
    const handelCategory=(category)=>{
      navigate(`/Categories/${category}`)
    }
  return (
    <section className="text-center" style={{backgroundColor:"#D5E0F4"}}>
      <div >
        <Container className="py-5">
          <Row className="mb-5">
            <Col>
              <small className="fs-5 text-gray">SHOP BY CATEGORY</small>
              <h1>Discover Our Collections</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4" >
              <Card className="categoryCard" onClick={()=>{handelCategory("women's clothing")}} style={{backgroundColor:"#EEEFF3",border:"none"}}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px',backgroundColor:"#261F55" }}>
                      <FaFemale className="w-50 h-50" />
                    </div>
                    <h4 className="ms-3">Women's Clothes</h4>
                  </div>
                  <Card.Text className="flex-grow-1 fs-6">Explore our latest collection of women's clothing, featuring stylish outfits for every occasion.</Card.Text>
                  <Button variant="link" onClick={()=>{handelCategory("women's clothing")}} className="p-0 text-primary">Shop Now
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ms-2" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card  className="h-100 categoryCard" onClick={()=>{handelCategory("men's clothing")}} style={{backgroundColor:"#EEEFF3",border:"none"}}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className=" text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px',backgroundColor:"#261F55" }}>
                      <FaMale className="w-50 h-50" />
                    </div>
                    <h4 className="ms-3">Men's Clothes</h4>
                  </div>
                  <Card.Text className="flex-grow-1 fs-6">Discover the latest trends in men's fashion, from casual wear to formal attire.</Card.Text>
                  <Button variant="link" onClick={()=>{handelCategory("men's clothing")}}  className="p-0 text-primary">Shop Now
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ms-2" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 categoryCard" onClick={()=>{handelCategory("jewelery")}} style={{backgroundColor:"#EEEFF3",border:"none"}}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className=" text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px',backgroundColor:"#261F55" }}>
                      <FaGem className="w-50 h-50" />
                    </div>
                    <h4 className="ms-3">Jewelry</h4>
                  </div>
                  <Card.Text className="flex-grow-1 fs-6">Find the perfect piece of jewelry to complement any outfit, from elegant necklaces to stunning rings.</Card.Text>
                  <Button variant="link" onClick={()=>{handelCategory("jewelery")}} className="p-0 text-primary">Shop Now
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ms-2" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className=" categoryCard" onClick={()=>{handelCategory("electronics")}} style={{backgroundColor:"#EEEFF3",border:"none"}}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className=" text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px',backgroundColor:"#261F55" }}>
                      <FaLaptop className="w-50 h-50" />
                    </div>
                    <h4 className="ms-3">Electronics</h4>
                  </div>
                  <Card.Text className="flex-grow-1 fs-6">Shop the latest in electronics, including cutting-edge gadgets and must-have devices.</Card.Text>
                  <Button variant="link" onClick={()=>{handelCategory("electronics")}} className="p-0 text-primary">Shop Now
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ms-2" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};
export default CategoryCard;
