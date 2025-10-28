import React from "react";

import { Link } from "react-router-dom";

import "../../MainStyle.css";
import "./about.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h2>About Our Sale$ Store</h2>

        <p>
          Welcome to MY Sale$ Store, where shopping meets convenience. Founded
          in 2021, we take pride in offering a wide selection of high-quality
          products to our valued customers.
        </p>
      </header>

      <section className="about-section">
        <h3>Our History</h3>

        <p>
          Since our inception, MY Sale$ Store has been committed to delivering
          an exceptional shopping experience. Starting as a small venture, we
          have grown into a reputable online destination for all your lifestyle
          needs.
        </p>
      </section>

      <section className="about-section">
        <h3>Our Mission</h3>

        <p>
          At MY Sale$ Store, our mission is to provide you with top-notch
          products that enhance your daily life. We strive to offer a seamless
          online shopping experience, ensuring customer satisfaction and
          loyalty.
        </p>
      </section>

      <section className="about-section">
        <h3>Quality Assurance</h3>

        <p>
          We understand the importance of quality, and that's why we carefully
          curate our product selection. Each item is chosen with precision to
          meet our standards of durability, functionality, and style.
        </p>
      </section>

      <footer className="about-footer">
        <p>
          Thank you for choosing MY Sale$ Store. We look forward to serving you
          and making your online shopping experience delightful.
        </p>

        <Link to="/contcat" className="btn btn-primary">
          Contact Us
        </Link>
      </footer>
    </div>
  );
};

export default AboutPage;
