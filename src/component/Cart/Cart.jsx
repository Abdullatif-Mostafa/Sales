import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img1 from '../../Images/orders.svg';
import "./cart.css";
import { clearCart, removeFromCart } from "../../RTK/Slices/CartSlice";

function Cart() {
  const navigate = useNavigate();
  const cartDetails = useSelector((state) => state.cart.items);
  console.log("CART DETAILS", cartDetails);
  const dispatch = useDispatch();
  
  const handelClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert them!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          text: "Your cart has been cleared!",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
    });
  };

  const handelDeleteProduct = (product) => {
    Swal.fire({
      title: "Delete This Product",
      text: "Are you sure to remove the product?",
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(product));
      }
    });
  };

  const handelProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="mb-4" style={{ marginTop: "77px", paddingTop: "20px", height: "auto" }}>
      <div className="container">
        {cartDetails.length > 0 && cartDetails && (
          <button
            className="btn text-light my-4"
            style={{ backgroundColor: "#261F55" }}
            onClick={() => handelClearCart()}
          >
            Clear Cart
          </button>
        )}
        <div className="row">
          {cartDetails.length > 0 ? (
            cartDetails.map((product) => (
              <div 
                className="col-md-4 col-lg-3 col-sm-6 mb-4" 
                key={product._id}
              >
                <div 
                  className="card text-center p-4" 
                  style={{ height: "460px" }}
                >
                  <button
                    onClick={() => handelDeleteProduct(product)}
                    className="btn-close float-start mb-3"
                    aria-label="Close"
                  ></button>
                  <img
                    onClick={() => handelProduct(product._id)}
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="200px"
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
                    <small className="lead fw-bolder">
                      Rating {product.rating && product.rating.rate}
                      <i className="fa fa-star"></i>
                    </small>
                    <p className="card-text lead fw-bold">${product.price}</p>
                  </div>
                  <Link
                    to={`/PaymentById/${product._id}`}
                    className="btn text-light ms-2 px-3 py-2"
                    style={{ backgroundColor: "#261F55" }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="container" style={{ backgroundColor: "#f1eded" }}>
              <div className="row">
                <div className="col-6">
                  <img src={img1} alt="img1" width={"80%"} height={"250px"} />
                </div>
                <div className="col-6">
                  <h3 style={{ fontWeight: "bold", paddingTop: "20px" }}>Your Cart Is Empty</h3>
                  <Link to="/" style={{ textDecoration: "none" }}>Shop today's deals</Link>
                </div>
              </div>
            </div>
          )}
          <div>
            {cartDetails && cartDetails.length > 0 && (
              <Link
                to="/PaymentPage"
                className="btn text-light  mt-5 d-flex justify-content-center align-items-center m-auto"
                style={{ backgroundColor: "#261F55" ,width:"fit-content",padding:"8px 15px",fontWeight:"bold"}}
              >
                Check Out Payment
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
