import React, { useEffect, useRef } from 'react';
// import '../../App.css';
import "./footer.css"
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Footer() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  // const isAuthenticated = useSelector((state) => state.auth.token);
  const sectionRefs = useRef([]);

  const handelCategory = (category) => {
    navigate(`/Categories/${category}`);
  };
  const SwalMethod=()=>{
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
  const handelLogin = (path) => {
    if (isAuthenticated) {
      navigate(`/${path}`);
    } else {
      SwalMethod();
      console.log(" not authenticated");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref) => {
        if (ref && ref.getBoundingClientRect().top < window.innerHeight) {
          ref.classList.add('visible');
        } else if (ref) {
          ref.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MDBFooter className='footer mt-0 mb-0 text-center text-lg-start text-muted'>
      <section className='container d-flex justify-content-center justify-content-lg-between p-4 border-bottom footer-section' ref={(el) => el && sectionRefs.current.push(el)}>
        <div className='me-5 d-none d-lg-block'>
          <span style={{ fontSize: "19px",animation:"slideIn 1s ease-in-out" }}>Get connected with us on our social networks:</span>
        </div>
        <div style={{ display: "flex", gap: "10px",animation:"slideLeft 2s ease-in-out" }}>
          <div className='footer-linkBox'>
            <a href=' ' className='fa fa-facebook text-reset'> </a>
          </div>
          <div className='footer-linkBox'>
            <a href=' ' className='fa fa-instagram text-reset'> </a>
          </div>
          <div className='footer-linkBox'>
            <a href=' ' className='fa fa-linkedin text-reset'> </a>
          </div>
          <div className='footer-linkBox'>
            <a href=' ' className='fa fa-twitter text-reset'> </a>
          </div>
        </div>
      </section>

      <section className='footer-section' ref={(el) => el && sectionRefs.current.push(el)}>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol sm="12" md="6" lg="3" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Sale$ Store
              </h6>
              <p style={{ width: "90%" }} className="text-center m-auto">
                Welcome to SALE$ Store, where shopping meets convenience. We take pride in offering a wide selection of high-quality products to our valued customers.
              </p>
            </MDBCol>

            <MDBCol sm="12" md="6" lg="3" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <small onClick={() => { handelCategory("electronics") }} className='text-reset'>
                  Electronics
                </small>
              </p>
              <p>
                <small onClick={() => { handelCategory("jewelery") }} className='text-reset'>
                  Jewelry
                </small>
              </p>
              <p>
                <small onClick={() => { handelCategory("women's clothing") }} className='text-reset'>
                  Women's Clothing
                </small>
              </p>
              <p>
                <small onClick={() => { handelCategory("men's clothing") }} className='text-reset'>
                  Men's Clothing
                </small>
              </p>
            </MDBCol>

            <MDBCol sm="12" md="6" lg="3" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <button onClick={() => { handelLogin("Profile") }} className='text-reset border-0 outline-0'>
                  Account
                </button>
              </p>
              <p>
                <button onClick={() => { handelLogin("settings") }} className='text-reset border-0 outline-0'>
                  Settings
                </button>
              </p>
              <p>
                <button onClick={() => { handelLogin("orders") }} className='text-reset border-0 outline-0'>
                  Orders
                </button>
              </p>
              <p>
                <button onClick={() => { handelLogin("helpPage") }} className='text-reset border-0 outline-0'>
                  Help and Support
                </button>
              </p>
            </MDBCol>

            <MDBCol sm="12" md="6" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Cairo, NY 10012 ST, EG
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 fs-5' style={{ backgroundColor: '#242259', color: "#fff", width: "100%" }}>
        <span className='me-1'>© 2024 Copyright: </span>
        <NavLink className='text-reset fs-5 fw-bold' to={'/'}>
          Sale$
        </NavLink>
      </div>
    </MDBFooter>
  );
}
