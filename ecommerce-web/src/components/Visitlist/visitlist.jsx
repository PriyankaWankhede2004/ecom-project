import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Row, Col } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import './visitlist.css';

const VisitList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userId) {
    return (
      <div className="container mt-5 text-center">
        <h3>Oops!</h3>
        <p>You don't have an account. Please login to continue.<br/><br/></p>
      </div>
    );
  }
  const userId = user?.userId;
  const [list, setList] = useState([]);

  const fetchVisitList = async () => {
    const res = await axios.get(`https://ecom-project-1.onrender.com/api/visitlist/${userId}`);
    setList(res.data);
  };

  const handleRemove = async (productId) => {
    await axios.delete(`https://ecom-project-1.onrender.com/api/visitlist/${userId}/${productId}`);
    fetchVisitList();
  };

  useEffect(() => {
    fetchVisitList();
  }, []);

  return (
    
    <div className="container mt-5">
       {/* banner */}
       <div className="bg-dark text-white text-center py-4 mb-5 mt-4 bgimagevisit">
        <h1 className="display-3 fw-bold">Wishlist</h1>
        <p className="lead">Continue shopping with us will have great deals.</p>
      </div>
      
      {list.length === 0 ? (
        <div className="text-center">
          <p>Add products to your wishlist to view them here. <br/> <br/> <br/> <br/> <br/> <br/></p>
        </div>
      ) : (
      <div className="row">
        {list.map(item => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm position-relative">

              {/* heart */}
              <div 
                className="position-absolute top-1 end-1 p-2" 
                style={{ cursor: 'pointer', zIndex: 1 }}
                onClick={() => handleRemove(item.productId)}
              >
                <FaHeart color="red" size={28} />
              </div>
              <Link to={`/product/${item.productId}`}>
              <img
                src={item.thumbnail}
                className="card-img-top p-3"
                alt={item.title}
                style={{ height: '250px', objectFit: 'contain' }}
              />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text mb-1"><strong>Brand:</strong> {item.brand}</p>
                <p className="card-text mb-1"><strong>Category:</strong> {item.category}</p>
                <p className="card-text mb-2"><strong>Price:</strong> ${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
<hr/>
            {/* Why Shop With Us */}
            <div className="text-center mb-5">
        <h2 className="mb-4">Why Shop With Us?</h2>
        <Row>
          <Col md={4}>
            <i className="bi bi-truck fs-1 text-primary mb-2"></i>
            <h5>Fast Delivery</h5>
            <p>We deliver products quickly to your doorstep.</p>
          </Col>
          <Col md={4}>
            <i className="bi bi-shield-lock fs-1 text-success mb-2"></i>
            <h5>Secure Payments</h5>
            <p>100% safe and secure checkout process.</p>
          </Col>
          <Col md={4}>
            <i className="bi bi-star fs-1 text-warning mb-2"></i>
            <h5>Top Rated</h5>
            <p>Our customers love our products & service.</p>
          </Col>
        </Row>
      </div>
      <hr/>
    </div>
  );
};

export default VisitList;
