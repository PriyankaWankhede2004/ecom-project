import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './order.css';

const OrderList = () => {
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
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`https://ecom-project-1.onrender.com/api/orders/${userId}`);
    setOrders(res.data.reverse());
    };
  
  const cancelItem = async (orderId, itemId) => {
    await axios.patch(`https://ecom-project-1.onrender.com/api/orders/${orderId}/cancel-item/${itemId}`);
    Swal.fire('Cancelled', 'Item cancelled from order', 'info');
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white text-center py-4 mb-5 mt-4 bgimageorder">
        <h1 className="display-3 fw-bold">My Orders</h1>
        <p className="lead">Hope to have Greate experience with us.Continue shopping.</p>
      </div>

      {orders.map(order => (
  <div key={order._id} className="card my-4 p-4">
    <h6>Order ID: {order._id}</h6>
    
    <div className="table-responsive mt-4">
      <table className="table table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item._id}>
              <td>
              <Link to={`/product/${item.productId}`}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              </Link>
              </td>             
              <td>
                {item.title}
                </td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{item.brand}</td>
              <td>{item.size ? item.size : '-'}</td>
              <td>
                <span className={`badge ${item.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}>
                  {item.status}
                </span>
              </td>
              <td>
                {item.status !== 'Cancelled' && (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => cancelItem(order._id, item._id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  <hr/>
    <h5>Contact Info </h5>
    <hr/>
    <p><strong>Name:</strong> {order.name}</p>
    <p><strong>Mobile:</strong> {order.mobile}</p>
    <p><strong>Address:</strong> {order.address}, {order.district}, {order.state}, {order.country}</p>

  </div>
))}
    </div>
  );
};

export default OrderList;
