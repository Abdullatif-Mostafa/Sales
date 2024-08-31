import React from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HelpPage = () => {
  return (
    <div style={{ marginTop: "77px",paddingTop:"5px"}}>
      <Container className="my-5">
        <h3 className="text-center mb-5">
        Welcome to your Sale$ Customer Service Center, Abdullatyf
        </h3>
        <Row>
          <Col md={6} style={{backgroundColor:"#EEEFF3"}}>
            <h3 style={{padding:"12px 0"}}
            >Frequently Asked Questions
            </h3>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>How do I create an account?</Accordion.Header>
                <Accordion.Body>
                  To create an account, click on the 'Register' button at the
                  top right corner of the page. Fill in your details and submit
                  the form. You will receive a confirmation email to activate
                  your account.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How do I place an order?</Accordion.Header>
                <Accordion.Body>
                  To place an order, browse through our products, add items to
                  your cart, and proceed to checkout. Fill in your shipping
                  details, select a payment method, and confirm your order.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  What payment methods do you accept?
                </Accordion.Header>
                <Accordion.Body>
                  We accept various payment methods including credit/debit
                  cards, PayPal, and bank transfers. You can choose your
                  preferred payment method during the checkout process.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>How do I track my order?</Accordion.Header>
                <Accordion.Body>
                  Once your order is shipped, you will receive a tracking number
                  via email. You can use this tracking number on our website to
                  track the status of your order.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>What is your return policy?</Accordion.Header>
                <Accordion.Body>
                  We have a 30-day return policy. If you are not satisfied with
                  your purchase, you can return it within 30 days of receipt for
                  a full refund or exchange. Please ensure that the items are in
                  their original condition and packaging.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md={6} style={{backgroundColor:"#EEEFF3"}}>
            <h3 style={{padding:"12px 0"}}>Contact Us</h3>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Customer Support</Card.Title>
                <Card.Text>
                  Email: support@ecommerce.com
                  <br />
                  Phone: 01203454546
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Technical Support</Card.Title>
                <Card.Text>
                  Email: techsupport@ecommerce.com
                  <br />
                  Phone: 01023456672
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Sales Inquiries</Card.Title>
                <Card.Text>
                  Email: sales@ecommerce.com
                  <br />
                  Phone: 01132323232
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HelpPage;
