import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { addToCart, removeFromCart } from "../../RTK/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./ProductCard.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true); // Start with loading state as true
  const [isFilledCart, setIsFilledCart] = useState(false);
  const isAuthenticated = localStorage.getItem('token');
  const cartDetails = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/Products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json.data);
        setLoading(false); // Data fetched successfully, stop loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading on error as well
      });
  }, [id]);

  const SwalMethod = () => {
    Swal.fire({
      title: 'Login Required',
      text: 'To proceed, please log in. If you don\'t have an account, you can create one now.',
      icon: 'warning',
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

  const handelPayment = (id) => {
    if (isAuthenticated) {
      navigate(`/PaymentById/${id}`);
    } else {
      SwalMethod();
    }
  }

  // Loading Skeleton Component
  const Loading = () => {
    return (
      <div className="row py-5">
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} style={{ lineHeight: 2 }} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <div style={{ display: "flex" }}>
            <Skeleton height={50} width={100} />
            <Skeleton height={50} width={100} style={{ marginLeft: "10px" }} />
          </div>
        </div>
      </div>
    );
  };

  // Actual Product Display Component
  const ShowProduct = () => {
    return (
      <div className="row py-5 showProducts">
        <div className="col-md-6 col-sm-12">
          <img
            src={product.image}
            alt={product._id}
            width={"400px"}
            height={"400px"}
            style={{ animation: "slideIn 1s ease-in-out" }}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-6">{product.title}</h1>
          <p className="lead fw-bolder" style={{ color: "#261F55" }}>
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-2">${product.price}</h3>
          <p style={{ fontSize: "19px" }}>{product.description}</p>
          <div style={{ display: "flex", justifyContent: "", flexDirection: "row", alignItems: "center" }}>
            <button
              style={{
                border: "1px solid #261F55",
                backgroundColor: isFilledCart ? "#261F55" : "",
                color: isFilledCart ? "#fff" : ""
              }}
              onClick={handleAddToCart}
              className="px-4 py-2 btn"
            >
              Add to Cart
            </button>
            <button onClick={() => handelPayment(product._id)} className="btn ms-2 px-3 text-white py-2" style={{ backgroundColor: "#261F55" }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "80px", backgroundColor: "#EEEFF3" }}>
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />} {/* Fixed rendering issue */}
        </div>
      </div>
    </div>
  );
};

export default Product;
