import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', mobile: '', district: '', country: '', state: '' });
  const [errors, setErrors] = useState({});
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId;

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error loading product', err));
  }, [id]);

  const isShoes = () => {
    const shoesKeywords = ['shoe', 'sneaker', 'sandal'];
    return shoesKeywords.some(keyword => 
      product?.category?.toLowerCase().includes(keyword) || 
      product?.title?.toLowerCase().includes(keyword)
    );
  };

  const isClothes = () => {
    const clothesKeywords = ['tshirt', 'shirt', 'cloth'];
    return clothesKeywords.some(keyword => 
      product?.category?.toLowerCase().includes(keyword) || 
      product?.title?.toLowerCase().includes(keyword)
    );
  };

  const handleCart = async () => {
    if (!userId) {
      Swal.fire('Login Required', 'Please login to continue', 'warning');
      return;
    }

    const cartItem = {
      userId,
      productId: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      brand: product.brand,
      category: product.category,
      quantity,
    };

    if (isShoes() || isClothes()) {
      cartItem.size = size;
    }

    try {
      await axios.post('http://localhost:5000/api/cart', cartItem);
      Swal.fire('Added', 'Product added to cart', 'success');
    } catch (error) {
      const msg = error.response?.data?.msg || 'This product is already in cart';
      Swal.fire('Oops', msg, 'info');
    }
  };

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (userId && product) {
        try {
          const res = await axios.get(`http://localhost:5000/api/visitlist/${userId}`);
          const isInList = res.data.some(item => item.productId === product.id);
          setWishlisted(isInList);
        } catch (error) {
          console.error("Error checking wishlist status", error);
        }
      }
    };
    fetchWishlistStatus();
  }, [userId, product]);

  const handleVisit = async () => {
    if (!userId) {
      Swal.fire('Login Required', 'Please login to continue', 'warning');
      return;
    }
  
    const item = {
      userId,
      productId: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      brand: product.brand,
      category: product.category,
    };
  
    try {
      if (!wishlisted) {
        await axios.post('http://localhost:5000/api/visitlist', item);
        setWishlisted(true);
      } else {
        await axios.delete(`http://localhost:5000/api/visitlist/${userId}/${product.id}`);
        setWishlisted(false);
      }
    } catch (error) {
      Swal.fire('Error', 'Could not update wishlist', 'error');
    }
  };

  const handleBuy = async () => {
    if (!userId) {
      Swal.fire('Login Required', 'Please login to continue', 'warning');
      return;
    }
  
    const newErrors = {};
  
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
  
    if (form.mobile && !/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
  
    if ((isShoes() || isClothes()) && !size) {
      Swal.fire('Select Size', 'Please select a size before buying.', 'info');
      return;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const orderItem = {
      productId: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      brand: product.brand,
      category: product.category,
      quantity,
      status: 'Placed',
      ...(isShoes() || isClothes() ? { size } : {})
    };
  
    const order = {
      userId,
      items: [orderItem],
      ...form
    };
  
    try {
      await axios.post('http://localhost:5000/api/orders', order);
      setShowForm(false);
      Swal.fire('Ordered', 'Your order was placed!', 'success');
      setErrors({});
    } catch (error) {
      Swal.fire('Error', 'Could not place order', 'error');
    }
  };
  
  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-start">
        {/* Left: Image & Rating */}
        <div className="col-md-5 text-center mt-5">
          <img src={product.thumbnail} alt={product.title} className="img-fluid rounded shadow" />

          <h5 className="mt-5 fs-6 fw-bold">Ratings :</h5>

          <div className="progress" style={{ height: '15px', maxWidth: '200px', margin: '0 auto', backgroundColor: '#d4edda' }}>
            <div
              className="progress-bar bg-success text-dark fw-bold"
              role="progressbar"
              style={{ width: `${(product.rating / 5) * 100}%` }}
            >
              {product.rating} / 5
            </div>
          </div>
          <div className="progress mt-2" style={{ height: '15px', maxWidth: '200px', margin: '0 auto', backgroundColor: '#d4edda' }}>
            <div
              className="progress-bar bg-success text-dark fw-bold"
              role="progressbar"
              style={{ width: `${(product.rating / 7) * 100}%` }}
            >
              {product.rating} / 5
            </div>
          </div>
          <br/>
                {/* star rating */}
        <div className="text-center mt-5">
        <h5>Give rating to the product :</h5>
        {[...Array(6)].map((_, index) => (
          <FaStar
            key={index}
            color={index < selectedRating ? '#f1c40f' : '#ccc'}
            size={24}
            className="star"
            onClick={() => setSelectedRating(index + 1)}
          />
        ))}
      </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-md-7 mt-4">
          <h2 className='mb-3'>{product.title}</h2>
          <hr />
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Stock Available:</strong> {product.stock}</p>

                    {/* Quantity Selector */}
           {/* Quantity Selector */}
<div className="my-2">
  <label className="form-label fw-bold me-3">Quantity:</label>
  <div className="d-inline-block" style={{ minWidth: '100px' }}>
    <select
      className="form-select d-inline-block"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
  </div>
</div>
          {/* Size Selector */}
          {(isShoes() || isClothes()) && (
           <div className="my-3">
           <label className="form-label fw-bold">Size:</label>
           <div className="btn-group d-block" role="group">
             {(isShoes()
               ? ['5', '6', '7', '8', '9', '10']
               : ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
             ).map(sizeOption => (
               <button
                 key={sizeOption}
                 type="button"
                 className={`btn me-2 mb-2 ${size === sizeOption ? 'btn-primary' : 'btn-outline-primary'}`}
                 onClick={() => setSize(sizeOption)}
               >
                 {sizeOption}
               </button>
             ))}
           </div>
         </div>
          )}

          <hr />


          <>Wishlist :
          {wishlisted ? (
            <FaHeart
              size={28}
              className="me-4 mb-2 cursor-pointer text-danger"
              onClick={handleVisit}
            />
          ) : (
            <FaRegHeart
              size={28}
              className="me-4 mb-2 cursor-pointer text-dark"
              onClick={handleVisit}
            />
          )}
          </>
          <button className="btn btn-warning me-3 mb-2" onClick={handleCart}>Add to Cart</button>
          <button className="btn btn-success mb-2 me-3" onClick={() => {
            if (!userId) {
              Swal.fire({
                icon: 'info',
                title: 'Oops!',
                text: 'You don\'t have an account. Please login to continue.',
              });
            } else {
              setShowForm(true);
            }
          }}>Buy Now</button>
          <br />
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
          <br /><br />

          {/* Buy Now Form */}
          {showForm && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Enter Delivery Details</h5>
                    <button type="button" className="btn-close" 
                      onClick={() => {
                        setShowForm(false);
                        setForm({ name: '', address: '', mobile: '', district: '', country: '', state: '' });
                        setErrors({});
                      }}></button>
                  </div>
                  <div className="modal-body">
                  {Object.keys(form).map((key) => (
  <div key={key}>
    <input
      name={key}
      className={`form-control my-2 ${errors[key] ? 'is-invalid' : ''}`}
      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      value={form[key]}
    />
    {errors[key] && (
      <div className="text-danger" style={{ fontSize: '0.875rem' }}>{errors[key]}</div>
    )}
  </div>
))}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleBuy}>Confirm Order</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
     
      <hr />
            {/*top deals images*/}
            <h3 className="text-center mt-4 mb-3">Top Deals For You</h3>
      <Link to={`/products`}>

        <Row className="text-center mb-5 justify-content-center">
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://image.freepik.com/free-vector/realistic-ad-template-perfume_23-2148255736.jpg"
                alt="Watch"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Trendy Perfume Long lasting</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.ytimg.com/vi/YSLcpIpSfWQ/maxresdefault.jpg"
                alt="Shoes"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Skin Care Serum,cream pack</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5789/5789725_rd.jpg"
                alt="Headphones"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Vivo Y-50</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://m.media-amazon.com/images/I/817jTRuLODL._AC_SL1500_.jpg"
                alt="Makeup"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Table Lamp</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.WJgG0-v1zkdtxP0L07G_BgHaJP&pid=Api&P=0&h=220"
                alt="Bags"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">I-Phone 13_Pro-Max</p>
            </div>
          </Col>
        </Row>
      </Link>

      <h3 className="text-center mt-4 mb-3">Top Rated Products </h3>
      <Link to={`/products`}>

        <Row className="text-center mb-5 justify-content-center">
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.ytimg.com/vi/vsIso0EY4GU/maxresdefault.jpg"
                alt="Watch"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Lake-me 9-to-5 Lipstick Matte</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/25/6c/19/256c19006b945701f7e2d080fde7b12d.jpg"
                alt="Shoes"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Nike Stylish Shoes</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://mir-s3-cdn-cf.behance.net/projects/404/5ab2af126380031.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png"
                alt="Headphones"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Eue De perfume Rose</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/aa/90/ec/aa90ecf545eec8d8e8ef5f7b397f3be3.jpg"
                alt="Makeup"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Lorel Paris Waterproof Foudation</p>
            </div>
          </Col>

          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://mir-s3-cdn-cf.behance.net/projects/404/9fb22999840405.Y3JvcCwyMjQzLDE3NTUsMTE2LDA.jpg"
                alt="Bags"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Lakme Sunscreen sp-50++</p>
            </div>
          </Col>
        </Row>
      </Link>
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
    </div>
  );
};

export default ProductDetails;