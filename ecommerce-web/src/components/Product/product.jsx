import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Spinner, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './product.css';

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryImages, setCategoryImages] = useState({});

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedFromHome = queryParams.get('category');

    //dummy api
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);

        // set thumbnail for category
        const imageMap = {};
        data.products.forEach(p => {
          if (!imageMap[p.category]) {
            imageMap[p.category] = p.thumbnail;
          }
        });
        setCategoryImages(imageMap);

        if (selectedFromHome && uniqueCategories.includes(selectedFromHome)) {
          setSelectedCategory(selectedFromHome);
          setFilteredProducts(data.products.filter(p => p.category === selectedFromHome));
        } else {
          setFilteredProducts(data.products);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [location.search]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  if (products.length === 0) {
    return (
      <p className="text-center mt-5">
        <Spinner variant='success' /> ...Loading...
      </p>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        {/* sidebar */}
        <Col md={3} className="mb-4">
          <h5 className="text-center">Select Categories</h5>
          <ListGroup>
            {categories.map((cat, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => handleCategoryClick(cat)}
                className={`text-center ${selectedCategory === cat ? 'border border-primary bg-light' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {cat !== 'All' && categoryImages[cat] && (
                  <div>
                    <img
                      src={categoryImages[cat]}
                      alt={cat}
                      className="cat-img"
                    />
                  </div>
                )}
                <div className="f-size">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </div>
              </ListGroup.Item>))}
          </ListGroup>
        </Col>

        {/* product*/}
        <Col md={9}>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <Link to={`/product/${product.id}`} className="l-text">
                  <Card>
                    <Card.Img variant="top" src={product.thumbnail} className="card-img" />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.description.substring(0, 60)}...</Card.Text>
                      <Card.Text><strong>${product.price}</strong></Card.Text>
                      <Button variant="primary">View Product</Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <hr />

      {/* Shop With Us section */}
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

    </Container>
  );
};

export default Productlist;