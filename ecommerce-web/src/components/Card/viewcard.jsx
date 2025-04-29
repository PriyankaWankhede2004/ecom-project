import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './card.css';

const CartList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userId) {
    return (
      <div className="container mt-5 text-center">
        <h3>Oops!</h3>
        <p>You don't have an account. Please login to continue.<br /><br /></p>
      </div>
    );
  }

  const userId = user?.userId;
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', address: '', mobile: '', district: '', country: '', state: ''
  });
  const [errors, setErrors] = useState({});

  // quantity, size state
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const fetchCart = async () => {
    const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    setCart(res.data);

    const quantities = {};
    res.data.forEach(item => {
      quantities[item.productId] = 1;
    });
    setSelectedQuantities(quantities);
  };

  const handleRemove = async (productId) => {
    await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
    fetchCart();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!form.district.trim()) newErrors.district = 'District is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    if (!form.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBuyAll = async () => {
    if (cart.length === 0) {
      return Swal.fire('Empty', 'Cart is empty!', 'info');
    }

    if (!validateForm()) return;

    const orderItems = cart.map(item => ({
      productId: item.productId,
      title: item.title,
      thumbnail: item.thumbnail,
      price: item.price,
      brand: item.brand,
      category: item.category,
      quantity: selectedQuantities[item.productId] || 1,
      size: selectedSizes[item.productId] || null,
      status: 'Placed'
    }));

    const order = {
      userId,
      items: orderItems,
      ...form
    };

    try {
      await axios.post('http://localhost:5000/api/orders', order);
      Swal.fire('Ordered', 'Your order has been placed!', 'success');
      setShowForm(false);
      setForm({ name: '', address: '', mobile: '', district: '', country: '', state: '' });
      setErrors({});
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const isWearCategory = (category) => {
    if (!category) return false;
    category = category.toLowerCase();
    return (
      category.includes('cloth') ||
      category.includes('wear') ||
      category.includes('shirt') ||
      category.includes('tshirt')
    );
  };

  const isFootwearCategory = (category) => {
    if (!category) return false;
    category = category.toLowerCase();
    return (
      category.includes('shoe') ||
      category.includes('sneaker') ||
      category.includes('sandal')
    );
  };

  // calculate total price 
  const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
      const itemTotal = (item.price * selectedQuantities[item.productId]);
      total += itemTotal;
    });

    const randomDiscount = Math.random() * 0.5;  // Random discount between 0 and 20%
    const discountAmount = total * randomDiscount;

    setDiscount(discountAmount);
    setTotalPrice(total - discountAmount);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedQuantities, cart]);  // recalculate total when quantity change

  const navigate = useNavigate();
  
  return (
    <div className="container mt-5">
       <div className="bg-dark text-white text-center py-4  mt-4 bgimagecard">
        <h1 className="display-3 fw-bold">Your Card</h1>
        <p className="lead">Order now to get more discont and more offers.</p>
      </div>
      {cart.length === 0 ? (
    <div className="text-center mt-4">
      <p><br/><br/>Add some items to your cart to see here.<br/><br/><br/><br/><br/></p>
    </div>
  ) : (
      cart.map(item => (
        <div key={item._id} className="card my-2 p-3 shadow-sm">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
  <div className=" card ">
    <img
      src={item.thumbnail}
      alt={item.title}
      className="img-fluid rounded-3"
      style={{ maxWidth: '150px', cursor: 'pointer' }}
      onClick={() => navigate(`/product/${item.productId}`)}
    />
  </div>
 </div>
 
            <div className="col-md-6">
              <h5>{item.title}</h5>
              <p className="mb-1"><strong>Brand:</strong> {item.brand}</p>
              <p className="mb-1"><strong>Category:</strong> {item.category}</p>
              <p className="mb-1"><strong>Price:</strong> ${item.price}</p>

              {/* quantity dropdown */}
              <div className="my-2 mt-2">
                <label><strong>Quantity: </strong></label>
                <select
                  value={selectedQuantities[item.productId] || 1}
                  onChange={e => {
                    setSelectedQuantities({
                      ...selectedQuantities,
                      [item.productId]: parseInt(e.target.value)
                    });
                  }}
                  className="form-select form-select-sm w-auto d-inline ms-2"
                >
                  {[...Array(10)].map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                  ))}
                </select>
              </div>

              {/* clothing or shoes*/}
              {(isWearCategory(item.category) || isFootwearCategory(item.category)) && (
                <div className="my-2 mt-3">
                  <label><strong>Size: </strong></label>
                  {(isWearCategory(item.category)
                    ? ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                    : ['5', '6', '7', '8', '9', '10']
                  ).map(size => (
                    <button
                      key={size}
                      className={`btn btn-sm m-1 ${selectedSizes[item.productId] === size ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedSizes({
                        ...selectedSizes,
                        [item.productId]: size
                      })}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-danger" onClick={() => handleRemove(item.productId)}>Remove</button>
            </div>
          </div>
        </div>
      ))
      )}
<hr/>
      {/*  total and discount */}
      {cart.length > 0 && (
  <div className="mt-4">
    <h4>Price Details</h4>
    {cart.map(item => (
      <div key={item.productId} className="d-flex justify-content-between mb-2">
        <div>{item.title} (x{selectedQuantities[item.productId]})</div>
        <div>${(item.price * selectedQuantities[item.productId]).toFixed(2)}</div>
      </div>
    ))}
<hr/>
<div className="d-flex justify-content-between mb-2">
  <div><strong>Total Price:</strong></div>
  <div>${cart.reduce((sum, item) => sum + (item.price * selectedQuantities[item.productId]), 0).toFixed(2)}</div>
</div>
<hr/>
    {/*  discount */}
    <div className="d-flex justify-content-between mb-2">
      <div><strong>Discount:</strong></div>
      <div className="text-danger">-${discount.toFixed(2)}</div>
    </div>

    {/*  final price after discount */}
    <div className="d-flex justify-content-between mb-4">
      <div><strong>You have to pay:</strong></div>
      <div><strong>${totalPrice.toFixed(2)}</strong></div>
    </div>
<hr/>
    <button className="btn btn-success mt-3" onClick={() => setShowForm(true)}>Buy Now</button>
  </div>
)}
      {/* Modal for form */}
      {showForm && (
        <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Delivery Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowForm(false);
                    setForm({ name: '', address: '', mobile: '', district: '', country: '', state: '' });
                    setErrors({});
                  }}
                />
              </div>
              <div className="modal-body">
                {Object.keys(form).map((key) => (
                  <div key={key} className="mb-2">
                    <input
                      name={key}
                      className="form-control"
                      placeholder={key}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                    {errors[key] && <small className="text-danger">{errors[key]}</small>}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleBuyAll}>Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
};

export default CartList;