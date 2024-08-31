
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{marginTop:"",height:"100vh"}}  >
        <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <Row className="w-100">
            <Col>
            <h1 className="display-1 fw-bold">404</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <p className="mb-4">It might have been removed or deleted. Try checking the URL or return to the home page.</p>
            <Button style={{backgroundColor:"#242259",color:"#fff",border:"none",outline:"none"}} size="md" onClick={() => navigate('/')}>Go to Homepage</Button>
            </Col>
        </Row>
        </Container>
 </div>
  );
};

export default NotFoundPage;
