import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const PaymentById = () => {

    const { productId } = useParams();
    console.log("producct ",productId);
    
    const [product, setProduct] = useState([]);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        state: '',
        zip: '',
        paymentMethod: 'credit',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: ''
    });
    const fetching = async () => {
        try {
          const response = await fetch(`https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Products/offers/${productId}`);
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
    //     fetch(`http://localhost:4000/Products/offers/${productId}`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             setProduct(json.data.product);
    //             console.log("json ofer", json.data.product);
    //         });
    }, [productId]);

    // useEffect(() => {
    //     fetch(`http://localhost:4000/Products/${productId}`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             setProduct(json.data.product);
    //             console.log("json ", json.data.product);
    //         });
    // }, [productId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value
        }));
    };

    const handleRadioChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            paymentMethod: e.target.value
        }));
    };

    return (
        <div style={{ marginTop: "110px" ,paddingBottom:"20px"}}>
            <div className="container my-5 pb-3" 
            style={{backgroundColor:"#EEEFF3"}}>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-dark">Your cart</span>
                            <span className="badge bg-dark rounded-pill">1</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <Link to={`/products/${product._id}`} className="my-0 text-dark text-decoration-none ">{product.title}</Link>
                                </div>
                                <span className="text-muted fw-bold fs-5">${product.discountPrice || product.price ?product.offerPrice:product.price }</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${product.price}</strong>
                            </li>
                        </ul>
                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First name" value={form.firstName} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name" value={form.lastName} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input type="text" className="form-control" id="username" placeholder="Username" value={form.username} onChange={handleInputChange} required />
                                        <div className="invalid-feedback">
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" value={form.email} onChange={handleInputChange} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={form.address} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" value={form.address2} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select" id="country" value={form.country} onChange={handleInputChange} required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                        <option>Egypt</option>
                                        <option>Morocco</option>
                                        <option>Saudi Arabia</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-select" id="state" value={form.state} onChange={handleInputChange} required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                        <option>Cairo</option>
                                        <option>Paris</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" value={form.zip} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="same-address" />
                                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="my-3">
                                <div className="form-check">
                                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" value="credit" checked={form.paymentMethod === 'credit'} onChange={handleRadioChange} required />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" value="debit" checked={form.paymentMethod === 'debit'} onChange={handleRadioChange} required />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" value="paypal" checked={form.paymentMethod === 'paypal'} onChange={handleRadioChange} required />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div>
                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" value={form.ccName} onChange={handleInputChange} required />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" value={form.ccNumber} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Credit card number is required.
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" value={form.ccExpiration} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Expiration date required.
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" value={form.ccCvv} onChange={handleInputChange} required />
                                    <div className="invalid-feedback">
                                        Security code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <button className="w-100 btn text-white btn-lg" style={{backgroundColor:"#261F55"}} type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentById;
