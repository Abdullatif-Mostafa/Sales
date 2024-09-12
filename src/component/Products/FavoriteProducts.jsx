import React from "react";
import img1 from "../../Images/kettle-desaturated._CB445243794_.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFavorites,
  removeFromFavorites,
} from "../../RTK/Slices/FavoriteProducts-Slice";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../RTK/Slices/CartSlice";
import Swal from "sweetalert2";
import "./product.css";

function FavoriteProducts() {
  const navigate = useNavigate();
  const favoriteProduct = useSelector((state) => state.favoriteProducts.items);
  const cartDetails = useSelector((state) => state.cart.items || []); // Ensure cartDetails is an array
  const dispatch = useDispatch();

  const handelClearFavoriteProducts = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert them!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
      showClass:{
        popup: 'animate__animated animate__fadeInDown'},
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp' },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearFavorites());
        Swal.fire({
          title: "Deleted!",
          text: "Your Favorite Products have been deleted.",
          // icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    });
  };

  const handelDeleteProduct = (product) => {
    Swal.fire({
      title: "Remove This Product",
      text: "Are you sure to remove the product?",
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromFavorites(product));
      }
    });
  };
  const handleAddToCart = (product) => {
    const isProductInCart = cartDetails.some(
      (cartProduct) => cartProduct._id === product._id
    );
    if (!isProductInCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product));
    }
  };
  const handelProduct = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>
        Favorite Products
      </h1>
      <div className="px-4 rounded-3 py-5" style={{ minWidth: "400px" }}>
        <div className="container">
          {favoriteProduct.length > 0 && (
            <button
              style={{ backgroundColor: "#261F55" }}
              className="btn text-light my-4"
              onClick={handelClearFavoriteProducts}
            >
              Clear Favorite Products
            </button>
          )}
          <div className="row">
            {favoriteProduct.length > 0 ? (
              favoriteProduct.map((product) => {
                const isProductInCart = cartDetails.some(
                  (cartItem) => cartItem._id === product._id
                );

                return (
                  <div
                    className="col-md-4 col-lg-3 col-sm-6 mb-4"
                    key={product.id}
                  >
                    <div className="card h-100 text-center p-4">
                      <button
                        onClick={() => handelDeleteProduct(product)}
                        className="btn-close float-start mb-2"
                        aria-label="Close"
                      ></button>
                      <img
                        onClick={() => handelProduct(product._id)}
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        height="250px"
                        style={{ cursor: "pointer" }}
                      />
                      <div
                        className="card-body"
                        onClick={() => handelProduct(product._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h5 className="card-title mb-0">
                          {product.title.substring(0, 18)}...
                        </h5>
                        <small
                          className="lead fw-bolder"
                          style={{ color: "#261F55" }}
                        >
                          Rating {product.rating && product.rating.rate}
                          <i className="fa fa-star"></i>
                        </small>
                        <p className="card-text lead fw-bold">
                          ${product.price}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          fontSize: "17px",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: isProductInCart ? "#261F55" : null,
                            color: isProductInCart ? "#fff" : "",
                          }}
                          className={`buttons btn ${
                            isProductInCart ? "" : "btn"
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {/* {isProductInCart
                            ? "Remove from Cart"
                            : "Add to Cart"} */}
                          {/* add to cart */}
                          <i className="fa fa-shopping-cart me-2 fs-3"></i>
                        </button>
                        <Link
                          to={`/PaymentById/${product._id}`}
                          className="btn text-white"
                          style={{ backgroundColor: "#261F55" }}
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={img1}
                  alt="img1"
                  style={{ width: "350px", marginBottom: "20px" }}
                />
                <h4>Ready to make a wish?</h4>
                <p style={{ textAlign: "center" }}>
                  Start adding the products you like to your wish list by
                  clicking on the heart sign
                </p>
                <Link
                  to="/products"
                  className="btn text-light"
                  style={{ backgroundColor: "#261F55" }}
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteProducts;
