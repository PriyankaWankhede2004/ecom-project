import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import Swal from 'sweetalert2';
import LoginForm from '../Login/login';
import SignupForm from '../Login/signup';

const MyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    userId: '', password: '', name: '', email: '',
    address: '', mobile: '', state: '', district: '', country: ''
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

 const handleClose = () => {
  setFormData({
    userId: '', password: '', name: '', email: '',
    address: '', mobile: '', state: '', district: '', country: ''
  });
  setShowModal(false);
};
  const handleShow = () => setShowModal(true);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        setLoggedInUser(null);
        navigate('/');
      }
    });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top" className="navbar-height">
        <Container>
          <Navbar.Brand href="#" className="font-and-flex">
            <i className="bi bi-cart4 me-1"></i> ShopStore
          </Navbar.Brand>

          <Nav className="me-auto ms-5">
            <Button variant={currentPath === '/' ? 'light' : 'dark'} onClick={() => navigate('/')}>Home</Button>
            <Button variant={currentPath === '/products' ? 'light' : 'dark'} onClick={() => navigate('/products')}>Products</Button>
            <Button variant={currentPath === '/viewcard' ? 'light' : 'dark'} onClick={() => navigate('/viewcard')}>ViewCart</Button>
            <Button variant={currentPath === '/myorder' ? 'light' : 'dark'} onClick={() => navigate('/myorder')}>MyOrders</Button>
            <Button variant={currentPath === '/visitlist' ? 'light' : 'dark'} className="heart" onClick={() => navigate('/visitlist')}>
              <i className="bi bi-heart-fill"></i> Wishlist
            </Button>
          </Nav>

          <Nav className="ms-auto">
            <Button variant={currentPath === '/settings' ? 'light' : 'secondary'} onClick={() => navigate('/settings')} className='me-2'>
              <i className="bi bi-list"></i> Settings
            </Button>

            {!loggedInUser ? (
              <Button variant="outline-light" onClick={handleShow}>
                Login
              </Button>
            ) : (
              <>
                <Button variant="outline-light" className="rounded-circle px-3 me-2" onClick={() => navigate('/profile')}>
                  <i className="bi bi-person-circle"></i>
                </Button>
                <Button variant="outline-warning" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* model */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isSignup ? 'Create Account' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isSignup ? (
            <LoginForm
              formData={formData}
              setFormData={setFormData}
              handleClose={handleClose}
              setLoggedInUser={setLoggedInUser}
              navigate={navigate}
            />
          ) : (
            <SignupForm
              formData={formData}
              setFormData={setFormData}
              setIsSignup={setIsSignup}
            />
          )}
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => 
             {
              setFormData({
                userId: '', password: '', name: '', email: '',
                address: '', mobile: '', state: '', district: '', country: ''
              });
            
              setIsSignup(!isSignup)
            }}>
              {isSignup ? 'Already have an account? Login' : 'Create a new account'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyNavbar;
