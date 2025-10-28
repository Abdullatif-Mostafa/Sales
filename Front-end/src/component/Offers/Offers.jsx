import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart, removeFromCart } from "../../RTK/Slices/CartSlice";
import { Link } from "react-router-dom";

const OffersPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProductIds, setCartProductIds] = useState([]);
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();

  const fetching = async () => {
    try {
      const response = await fetch('https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Products/offers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data ", data.data);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  useEffect(() => {
    setCartProductIds(cartDetails.map((product) => product._id));
  }, [cartDetails]);

  const handelNavigate = (product) => {
    navigate(`/OffersPage/${product}`);
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cartProductIds.includes(product._id);
    if (!isProductInCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product));
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 pt-2" style={{ marginTop: "77px", paddingTop: "13px" }}>
        Special Offers
      </h2>
      <Row>
        {products.map((product) => (
          <Col md={4} lg={3} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }}>
              <Card.Img
                alt={product.title}
                variant="bottom"
                src={product.image}
                className="p-3"
                onClick={() => handelNavigate(product._id)}
                style={{ height: "250px", objectFit: "contain", cursor: "pointer" }}
              />
              <Card.Body className="d-flex flex-column" onClick={() => handelNavigate(product._id)}>
                <Card.Title className="text-center">{product.title.substring(0, 20)}</Card.Title>
                <div className="d-flex gap-1 justify-content-center align-items-center mb-1">
                  <Card.Text className="text-center bg-red p-1 m-lg-1 rounded-1" style={{ fontWeight: "bold", backgroundColor: "rgb(204, 12, 57)", color: "rgb(255, 255, 255)" }}>
                    {product.offersPercentage}% off
                  </Card.Text>
                  <small style={{ fontSize: "17px", color: "rgb(204, 12, 57)" }}> Limited time deal</small>
                </div>
                <Card.Text className="text-center mt-0">
                  Rating {product.rating.rate}
                  <i className="fa fa-star"></i>
                </Card.Text>
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "space-around" }}>
                  <Card.Text className="text-center mb-0 fs-5 font-weight-bold">
                    $ {product.discountPrice}
                  </Card.Text>
                  <Card.Text className="text-center fs-5 m-0 font-weight-bold text-muted d-flex justify-content-between align-items-center" style={{ textDecoration: "line-through" }}>
                    $ {product.price}
                  </Card.Text>
                </div>
              </Card.Body>
              <div className="d-flex justify-content-around mb-2 align-items-center">
                <button
                  style={{
                    backgroundColor: cartProductIds.includes(product._id) ? "#261F55" : null,
                    color: cartProductIds.includes(product._id) ? "#fff" : "",
                  }}
                  className="btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fa fa-shopping-cart me-2 fs-3"></i>
                  {cartProductIds.includes(product._id) ? "" : ""}
                </button>
                <Link to={`/PaymentById/${product._id}`} className="btn text-white" style={{ backgroundColor: "#261F55" }}>Buy Now</Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OffersPage;
