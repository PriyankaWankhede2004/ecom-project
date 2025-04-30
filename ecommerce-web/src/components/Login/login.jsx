import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ formData, setFormData, handleClose, setLoggedInUser, navigate }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleLogin = async () => {
    const newErrors = {};
    if (!formData.userId) newErrors.userId = 'User ID is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    try {
      const res = await axios.post('https://ecom-project-1.onrender.com/api/auth/login', {
        userId: formData.userId,
        password: formData.password,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setLoggedInUser(res.data);
      Swal.fire('Success', 'Login successful', 'success').then(() => {
        handleClose();
        navigate('/');
      });
    } catch {
      Swal.fire('Error', 'Invalid credentials, please enter correct user id and password', 'error');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <input
        className="form-control my-2"
        placeholder="User ID"
        name="userId"
        onChange={handleChange}
        value={formData.userId}
      />
      {errors.userId && <div style={{ color: 'red', fontSize: '0.9rem' }}>{errors.userId}</div>}

      <div className="input-group my-2">
        <input
          className="form-control"
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
          {passwordVisible ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {errors.password && <div style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password}</div>}

      <Button className="w-100 mt-3" variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};

export default LoginForm;
