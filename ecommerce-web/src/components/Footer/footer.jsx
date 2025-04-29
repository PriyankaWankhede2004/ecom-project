import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto mb-0 w-100 ">
      <Row>
        <Col md={4}>
          <h5>About Us</h5>
          <p>
            We provide the best products at the best prices. Shop with
            confidence!
          </p>
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <h5>Contact</h5>
          <p>Twitter: @supportshopstore</p>
          <p>Phone: +91-1234567890</p>
          <p>Location: Washim, India</p>
        </Col>
        <Col md={4}>
          <p>Uncover exclusive deals on our premium product selection</p>
        </Col>

        <Col md={4}>
          <p>Email: support@shopstore.com</p>
        </Col>

        <Col md={4}>
          <p></p>
        </Col>
      </Row>
      <hr className="border-light" />
      <p className="text-center mb-0">© 2025 Your Ecom. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
