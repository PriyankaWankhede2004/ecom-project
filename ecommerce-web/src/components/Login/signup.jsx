import React from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import './signup.css';

const SignupForm = ({ formData, setFormData, setIsSignup }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const requiredFields = [
    'name',
    'email',
    'userId',
    'password',
    'address',
    'mobile',
    'state',
    'district',
    'country',
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;

  const isEmailValid = emailRegex.test(formData.email || '');
  const isMobileValid = mobileRegex.test(formData.mobile || '');

  const areAllFieldsFilled = requiredFields.every((field) => {
    const value = formData[field];
    return value && String(value).trim() !== '';
  });

  const isFormValid = areAllFieldsFilled && isEmailValid && isMobileValid;

  const handleSignup = async () => {
    try {
      await axios.post('https://ecom-project-1.onrender.com/api/auth/register', formData);
      Swal.fire('Success', 'Registered successfully', 'success');
      setFormData({});
      setIsSignup(false);
    } catch (error) {
      Swal.fire(
        'Error',
        'This user ID is already used. Please create a different user ID. Numbers and symbols in UserId not allowed,use only alphabates',
        'error'
      );
    }
  };

  return (
    <>
      {requiredFields.map((key) => (
        <input
          key={key}
          className="form-control my-1"
          placeholder={key}
          name={key}
          onChange={handleChange}
          value={formData[key] || ''}
          type={key === 'email' ? 'email' : key === 'mobile' ? 'tel' : 'text'}
        />
      ))}

      {!isEmailValid && formData.email && (
        <div className="text-danger text-center sizef" >
          Please enter a valid email address
        </div>
      )}

      {!isMobileValid && formData.mobile && (
        <div className="text-danger text-center sizef" >
          Mobile number must be 10 digits
        </div>
      )}

      {!isFormValid && (
        <div className="text-danger text-center mt-1 sizef">
          Please fill in all fields correctly to enable signup
        </div>
      )}

      <Button
        className="w-100 mt-2"
        variant="success"
        onClick={handleSignup}
        disabled={!isFormValid}
      >
        Signup
      </Button>
    </>
  );
};

export default SignupForm;
