import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart, removeFromCart } from "../../RTK/Slices/CartSlice";
import { addToFavorites, removeFromFavorites } from "../../RTK/Slices/FavoriteProducts-Slice";
import "./ProductCard.css"; // Add custom styles for skeleton


const ProductCard = ({ product, isLoading }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFilledCart, setIsFilledCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteProductslist = useSelector((state) => state.favoriteProducts?.items);
  const cartDetails = useSelector((state) => state.cart.items);
  const isAuthenticated = localStorage.getItem('token');

  const SwalMethod = () => {
    Swal.fire({
      title: 'Login Required',
      text: 'To proceed, please log in. If you don\'t have an account, you can create one now.',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Close',
      showDenyButton: true,
      denyButtonText: 'Create Account',
      background: '#f9f9f9',
      confirmButtonColor: '#0282f9',
      denyButtonColor: '#261F55',
      cancelButtonColor: ' rgb(82, 82, 82)',
      customClass: {
        title: 'swal2-title-custom', // Custom styling
        popup: 'swal2-popup-custom',
        confirmButton: 'swal2-confirm-custom',
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      } else if (result.isDenied) {
        navigate('/register');
      }
    });
  }


  const handleAddToCart = () => {
    if (isAuthenticated) {
      const isProductInCart = cartDetails.some(cartItem => cartItem._id === product._id);
      if (!isProductInCart) {
        dispatch(addToCart(product));
      } else {
        dispatch(removeFromCart(product));
      }
      setIsFilledCart(!isProductInCart);
    } else {
      SwalMethod();
    }
  };

  const handleFavoriteClick = () => {
    if (isAuthenticated) {
      const isProductInFavorites = favoriteProductslist.some(item => item._id === product._id);
      if (!isProductInFavorites) {
        dispatch(addToFavorites(product));
      } else {
        dispatch(removeFromFavorites(product));
      }
      setIsFilled(!isProductInFavorites);
    } else {
      SwalMethod();
    }
  };

  useEffect(() => {
    const isProductInCart = cartDetails.some(cartItem => cartItem._id === product._id);
    setIsFilledCart(isProductInCart);
  }, [cartDetails, product._id]);

  useEffect(() => {
    const isProductInFavorites = favoriteProductslist?.some(item => item._id === product._id);
    setIsFilled(isProductInFavorites);
  }, [favoriteProductslist, product._id]);

  if (isLoading) {
    return (
      <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
        <div className="card h-100 text-center p-4 skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-text title"></div>
          <div className="skeleton-text rating"></div>
          <div className="skeleton-text price"></div>
          <div className="skeleton-actions">
            <div className="skeleton-btn"></div>
            <div className="skeleton-heart"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-4 col-lg-3 col-sm-6 mb-4" key={product._id}>
      <div className="card h-100 text-center p-4" style={{ border: "1px solid #ddd", backgroundColor: "#EEEFF3" }}>
        <img
          onClick={() => navigate(`/products/${product._id}`)}
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ cursor: "pointer", height: "250px", objectFit: "contain" }}
        />
        <div className="card-body" onClick={() => navigate(`/products/${product._id}`)} style={{ cursor: "pointer" }}>
          <h6 className="card-title mb-2 fs-5">{product.title.substring(0, 15)}...</h6>
          <small className="lead fw-bolder fs-5" style={{ color: "#261F55" }}>
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star fs-5"></i>
          </small>
          <p className="card-text lead fw-bold fs-5">${product.price}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>
          <div
            style={{
              backgroundColor: isFilledCart ? "#261F55" : null,
              color: isFilledCart ? "#fff" : "",
            }}
            className={`btn ${!isFilledCart ? "btn" : ""}`}
            onClick={handleAddToCart}
          >
            <i className="fa fa-shopping-cart me-2 fs-3"></i>
          </div>
          <button onClick={handleFavoriteClick} className="heart-icon">
            <i
              className={`fa ${isFilled ? "fa-heart" : "fa-heart-o"}`}
              style={{
                width: "26px",
                height: "26px",
                color: isFilled ? "#261F55" : "currentColor",
                fontSize: "26px",
                cursor: "pointer",
              }}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
