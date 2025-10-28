import React from 'react';
// import "../../MainStyle.css";
import "./privacy.css"

const PrivacyAndSecurity = () => {
  return (
    <div className="privacy-security" style={{marginTop:"77px"}}>
      <header className="header">
        <h1><i className="fas fa-shield-alt"></i> Privacy and Security</h1>
      </header>
      <div className="content " style={{ animation:"slideIn 2s ease-in-out"}}>
        <section className="section">
          <h2>Information We Collect</h2>
          <p>We collect the following information when you use our website:</p>
          <ul>
            <li>Personal information you provide, such as your name, email address, and shipping address.</li>
            <li>Information about your browsing activity on our website, such as the pages you visit and the products you view.</li>
          </ul>
        </section>
        <section className="section">
          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process your orders and deliver your purchases.</li>
            <li>Send you marketing and promotional emails (with your consent).</li>
            <li>Improve our website and your shopping experience.</li>
          </ul>
        </section>
        <section className="section">
          <h2>Data Security</h2>
          <p>We take the security of your data very seriously. We use a variety of security measures to protect your information, including:</p>
          <ul>
            <li>Secure Socket Layer (SSL) technology to encrypt your data during transmission.</li>
            <li>Firewalls and intrusion detection systems to protect our servers.</li>
            <li>Regular security audits to identify and address any potential vulnerabilities.</li>
          </ul>
        </section>
        <section className="section">
          <h2>Your Choices</h2>
          <p>You have control over your information. You can:</p>
          <ul>
            <li>Access and update your personal information at any time.</li>
            <li>Unsubscribe from our marketing emails.</li>
            <li>Request that we delete your information from our records.</li>
          </ul>
        </section>
        <section className="footer" style={{backgroundColor:"black !mportant"}}>
          <h2>Contact Us</h2>
          <p>If you have any questions about our privacy policy, please contact us at <a href="mailto:support@ecommerce.com">support@ecommerce.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
