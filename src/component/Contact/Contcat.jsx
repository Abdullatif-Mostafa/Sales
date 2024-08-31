import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Contact.css";
import "../Animation.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        message: "",
      });
      setLoading(false);
      Swal.fire({
        title: "Thank you!",
        text: `Hello, Mr ${formData.firstName}. Your message has been sent successfully. We will get in touch with you soon.`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor:"#261F55",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      });
      console.log("Form submitted:", formData);
    }, 2000); // Simulate a delay
  };

  return (
    <section className="Contact">
      <div className="">
        <div className="container">
          <h2 className="text-center text-light fs-2 pt-3 mb-4">Contact Us</h2>
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your first name"
                    aria-label="First Name"
                    aria-required="true"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your last name"
                    aria-label="Last Name"
                    aria-required="true"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    aria-label="Email"
                    aria-required="true"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    placeholder="Enter your contact number"
                    aria-label="Contact Number"
                    aria-required="true"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message"
                    aria-label="Message"
                    aria-required="true"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-12 text-center buttons">
                  <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
