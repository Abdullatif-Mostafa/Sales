import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../RTK/Slices/CartSlice";
import "./Offers";

function OffersPageDetails() {
  const { offerId } = useParams();
  const [isFilledCart, setIsFilledCart] = useState(false);
  const [product, setProduct] = useState(null); // Change to null initially
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartDetails = useSelector((state) => state.cart.items);

  const fetching = async () => {
    try {
      const response = await fetch(`https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Products/offers/${offerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data ", data.data);
      setProduct(data.data); // Changed to setProduct
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetching();
  }, [offerId]);

  const handelAddToCart = (product) => {
    const foundElement = cartDetails?.some((item) => item._id === product._id);
    if (!foundElement) {
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product));
    }
    setIsFilledCart(!isFilledCart);
  };

  const handelPayment = (id) => {
    console.log("id ",id)
    navigate(`/PaymentById/${id}`);
  };

  return (
    <div style={{ marginTop: "77px", backgroundColor: "#EEEFF3" ,paddingTop:"10px"}}>
      <div className="container">
        <div className="row py-5 showProducts">
          <div className="col-md-6 col-sm-12">
            {product && product.image && (
              <img
                src={product.image}
                alt={product.id}
                width={"400px"}
                height={"400px"}
                style={{ animation: "slideIn 1s ease-in-out" }}
              />
            )}
          </div>
          <div className="col-md-6 col-sm-12">
            {product && (
              <>
                <h4 className="text-uppercase text-black-50">{product.category}</h4>
                <h4 className="display-6">{product.title}</h4>
                <p className="lead fw-bolder" style={{ color: "#261F55" }}>
                  Rating {product.rating && product.rating.rate}
                  <i className="fa fa-star"></i>
                </p>
                <div
                  className="cardDetails"
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    gap: "20px",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="text-center bg-red p-2 m-lg-1 rounded-1"
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "rgb(204, 12, 57)",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    {product.offersPercentage}% off
                  </p>
                  <small className="small" style={{ fontSize: "20px", color: "rgb(204, 12, 57)" }}>
                    Limited time deal
                  </small>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    gap: "20px",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p className="text-center mb-0 fs-2 font-weight-bold">
                    $ {product.discountPrice}
                  </p>
                  <p
                    className="text-center fs-2 m-0 font-weight-bold text-muted d-flex justify-content-between align-items-center"
                    style={{ textDecoration: "line-through" }}
                  >
                    $ {product.price}
                  </p>
                </div>
                <p className="" style={{ fontSize: "18px" }}>
                  {product.description?.substring(0, 203)} ...
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #261F55",
                      backgroundColor: `${isFilledCart ? "#261F55" : ""}`,
                      color: `${isFilledCart ? "#fff" : ""}`,
                    }}
                    onClick={() => handelAddToCart(product)}
                    className="px-4 py-2 btn"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handelPayment(product._id)}
                    className="btn  ms-2 px-3 text-white py-2"
                    style={{ backgroundColor: "#261F55" }}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default OffersPageDetails;
