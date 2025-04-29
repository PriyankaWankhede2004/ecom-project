import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import MyNavbar from './components/NavBar/navbar';
import Home from './components/Home/home';
import ProductDetails from './components/Product/prodctdetails';
import Productlist from './components/Product/product';
import CartList from './components/Card/viewcard';
import Profile from './components/Login/profile';
import OrderList from './components/Orders/myorders';
import Myvisitlist from './components/Visitlist/visitlist';
import Mysettings from './components/Setting/setting';
import Footer from './components/Footer/footer';
import { useState, useEffect } from 'react';

const App = () => {

  const [theme, setTheme] = useState('light');
  const [font, setFont] = useState('Arial');

  //theme, font
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
    document.body.style.fontFamily = font;
  }, [theme, font]);

  useEffect(() => {
    if (!sessionStorage.getItem('firstLoadDone')) {
      localStorage.clear();
      sessionStorage.setItem('firstLoadDone', 'true');
    }
  }, []);
  
  useEffect(() => {
    async function checkServerVersion() {
      try {
        const res = await fetch('/api/version');
        const data = await res.json();
        const serverVersion = data.version;
  
        const storedVersion = localStorage.getItem('serverVersion');
  
        if (storedVersion !== serverVersion) {
          localStorage.clear();
          localStorage.setItem('serverVersion', serverVersion);
          window.location.reload(); // Refresh to show login/logout correctly
        } else {
          // All good, nothing to do
        }
      } catch (error) {
        console.error('Version check failed', error);
      }
    }
  
    checkServerVersion();
  }, []);
  
  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/viewcard" element={<CartList />} />
        <Route path="/myorder" element={<OrderList />} />
        <Route path="/visitlist" element={<Myvisitlist />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Mysettings theme={theme}
          setTheme={setTheme}
          font={font}
          setFont={setFont}
        />} />

        {/*product to productlist*/}
        <Route path="/product" element={<Productlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;