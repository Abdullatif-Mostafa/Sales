import React, { useEffect, useState } from "react";
// import './Orders.css';
import "./order.css";
import img1 from "../../Images/orders.svg";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dummyOrders = 
    [
      // {
      //   id: 1,
      //   date: "2023-07-15",
      //   total: 150.75,
      //   items: [
      //     { name: "Product 1", quantity: 2, price: 50 },
      //     { name: "Product 2", quantity: 1, price: 50.75 },
      //   ],
      // },
      // {
      //   id: 2,
      //   date: "2023-06-10",
      //   total: 200.0,
      //   items: [
      //     { name: "Product 3", quantity: 1, price: 100 },
      //     { name: "Product 4", quantity: 2, price: 50 },
      //   ],
      // },
      // {
      //   id: 3,
      //   date: "2023-05-05",
      //   total: 75.5,
      //   items: [{ name: "Product 5", quantity: 1, price: 75.5 }],
      // },
    
    ]
    setOrders(dummyOrders);
  }, []);

  return (
    <div
      className="orders-container mb-3"
      style={{
        marginTop: "77px",
        paddingTop: "40px",
        height: "auto",
        backgroundColor: "",
        
      }}
    >
      <div>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: ""
            }}
          >
            <img src={img1} alt="img1 " />
            <h4>You have no previous orders</h4>
            <p>
              We have thousands of products available through our wide range of
              sellers. Order now!
            </p>
            <Link
              to="/products"
              className="btn text-light"
              style={{ backgroundColor: "#242259" }}
            >
              Order Now
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" style={{ animation:"slideIn 2s ease-in-out",backgroundColor:"#EEEFF3" }} key={order.id}>
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>
                <div className="order-details">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="order-total">
                    <strong>Total:</strong>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
