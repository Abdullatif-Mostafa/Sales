import React from 'react';
import "./terms of services.css"
// import '../../MainStyle.css';

const AdvancedTermsOfService = () => {
  return (
    <div className="advanced-terms-container mb-4 pt-3" style={{marginTop:"77px",paddingTop:"2px"}}>
      <header className="header">
        <h1>Terms of Service</h1>
        <p>Last updated: July 21, 2024</p>
      </header>
      <section className="section">
        <div className="section-header">
          <h2>1. Acceptance of Terms</h2>
        </div>
        <p>
          By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using our services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>2. Provision of Services</h2>
        </div>
        <p>
          We are constantly innovating in order to provide the best possible experience for our users. You acknowledge and agree that the form and nature of the services which we provide may change from time to time without prior notice to you.
        </p>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>3. Use of Services</h2>
        </div>
        <p>
          You agree to use the services only for purposes that are permitted by (a) the terms and (b) any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
        </p>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>4. Content in Services</h2>
        </div>
        <p>
          You understand that all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials ("Content"), whether publicly posted or privately transmitted, are the sole responsibility of the person from which such Content originated.
        </p>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>5. Termination</h2>
        </div>
        <p>
          We may, at any time, terminate our legal agreement with you if you have breached any provision of the terms or if we are required to do so by law.
        </p>
      </section>
      <footer className="footer">
        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:terms@ecommerce-website.com">terms@ecommerce-website.com</a>.</p>
      </footer>
    </div>
  );
};

export default AdvancedTermsOfService;
