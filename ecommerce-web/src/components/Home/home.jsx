import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './home.css';

const Home = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  //dummy api
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        const products = data.products;
        const grouped = {};

        //3 category img
        for (const product of products) {
          const cat = product.category;
          if (!grouped[cat]) {
            grouped[cat] = [];
          }
          if (grouped[cat].length < 3) {
            grouped[cat].push(product.thumbnail);
          }
        }

        //11 categories
        const first10 = Object.entries(grouped).slice(0, 11);
        const limitedGrouped = Object.fromEntries(first10);
        setGroupedProducts(limitedGrouped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Dummy Api error:', err);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      {/* Header */}
      <div className="bg-dark text-white text-center py-5 mb-2 mt-4 bgimage">
        <h1 className="display-3 fw-bold text">Welcome to ShopStore</h1>
        <p className="lead">Unbeatable prices. Unmatched quality.</p>
        <Link to="/products">
          <Button variant="light" size="lg" className="fw-semibold">Shop Now</Button>
        </Link>
      </div>
      <hr />

      {/*top deals img*/}
      <h3 className="text-center mt-4 mb-3">Top Deals Just For You</h3>
      <Link to={`/products`}>
        <Row className="text-center mb-5 justify-content-center">
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/cb/8c/75/cb8c7570ec110073d53f9fc3060e17be.jpg"
                alt="Watch"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Trendy Watches</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://www.gngmodels.com/wp-content/uploads/2022/10/female-footwear-photoshoot-2-682x1024.jpg"
                alt="Shoes"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Stylish Shoes</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/b9/8d/1b/b98d1b6f3427f593ed4702fc4d23cefe.png"
                alt="Headphones"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Cool Headphones</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/1b/2a/c1/1b2ac106b67c5128e009f4eed244d8f9.jpg"
                alt="Makeup"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Makeup Essentials</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={2}>
            <div className="p-2 border rounded h-100">
              <img
                src="https://i.pinimg.com/originals/81/9c/70/819c7016ec09ef2c096e5b4a42093cc4.jpg"
                alt="Bags"
                className="img-fluid mb-2 w-100"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <p className="fw-semibold text-black">Trendy Bags</p>
            </div>
          </Col>
          <hr />
        </Row>

      </Link>

      {/*  top image */}
      <div className="mb-4">
        <img
          src="https://c8.alamy.com/comp/2D7GAPB/online-sale-shopping-vector-banner-design-
    online-shopping-text-with-phone-cart-and-paper-bag-elements-in-smartphone-app-store-for-mobile-business-2D7GAPB.jpg"
          alt="Top Banner"
          className="img-fluid w-100"
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </div>
      {/* categorie section */}
      <div className="container mb-5">
        <div className="marquee-banner">
          <div className="marquee-text">Flash Sale - Upto 50% OFF</div>
        </div>
        <hr />
        <br />
        <h2 className="text-center mb-4">Categories & Highlights</h2>
        {/* full width image */}
        <div className="mb-4">
          <img
            src="https://i.pinimg.com/736x/c4/30/50/c430509e01a30e56776f2a3810af4a4b.jpg"
            alt="Top Banner"
            className="img-fluid w-100"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, images], idx) => (
            <React.Fragment key={idx}>
              <div className="p-4 mb-4 border rounded shadow-sm bg-light">
                <Row className="align-items-center">
                  <Col md={9}>
                    <h4 className="mb-3 text-capitalize">{category}</h4>
                    <Row>
                      {images.map((img, i) => (
                        <Col key={i} xs={12} sm={4} className="mb-3 mb-sm-0">
                          <Link to={`/products?category=${encodeURIComponent(category)}`}>
                            <div className="border rounded p-2 bg-white shadow-sm h-100 d-flex align-items-center justify-content-center">
                              <img
                                src={img}
                                alt={`product-${i}`}
                                className="img-fluid"
                                style={{ height: '180px', objectFit: 'contain', cursor: 'pointer' }}
                              />
                            </div>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col md={3} className="text-end d-flex align-items-center justify-content-end h-100">
                    <Link to={`/products?category=${encodeURIComponent(category)}`}>
                      <Button variant="primary" className="fw-semibold">
                        Explore <FaArrowRight />
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
              {/*decoration by img*/}
              {/*beauty*/}
              {category === 'beauty' && (
                <div className="mb-4">
                  <img
                   src="https://images-static.nykaa.com/uploads/8644f73a-0d66-4c9a-8ed5-42a9eaaf326b.jpg"
                    alt="Fragrance Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  <h3 className="text-center mt-4 mb-3 text-product ">Top Rated Products</h3>
                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse3.mm.bing.net/th?id=OIP.TT4_10agEyV9P04dDmrk1gHaJ4&pid=Api&P=0&h=220"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Vitamin-c +niacianmide foundation </p>
                      </div>
                    </Col>
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://gumlet.assettype.com/afaqs/2023-02/b256d8f4-6fe4-4502-b4c0-5f7fd19926b7/Lakm___UnapologeticallyM_____This_Once__Red_Means_Go____Campaign_Visual_2.png?rect=0%2C40%2C843%2C443&w=1200&auto=format%2Ccompress&ogImage=true"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Waterproof Eyeliner flat 40% off friday sale</p>
                      </div>
                    </Col>
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/264095175611267.64b6ab6db5617.jpg"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Top rated pink lipstick with sunprotection spf 30pa</p>
                      </div>
                    </Col>
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://www.letsexpresso.com/wp-content/uploads/2015/09/The-Key-Visual-800x591.jpg"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New arival organic lipstic</p>
                      </div>
                    </Col>
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse3.mm.bing.net/th?id=OIP.mloahiTx_iHd7KQpWG25YwHaHa&pid=Api&P=0&h=220"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Most order foundation serum</p>
                      </div>
                    </Col>
                  </Row>

                  {/*big img*/}
                  <img
                    src="https://i.ytimg.com/vi/OoAF_ukQgJM/maxresdefault.jpg"
                    alt="Beauty Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />

                  {/*small img*/}
                  <h3 className="text-center mt-4 mb-3">Our top Rated products</h3>

                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://img.freepik.com/premium-vector/new-cosmetics-beauty-products-facebook-instagram-post-template-ad_521579-84.jpg?w=2000"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Eue de prefumes offer going on</p>
                      </div>
                    </Col>


                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://cdn.confect.io/uploads/media/image(89).jpg"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Skin care flat 30% off</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://cdn.confect.io/uploads/media/jones%20road%20beauty.jpeg"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Lakme lip blam top saled</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://img.freepik.com/free-vector/beauty-skin-care-product-banner_33099-2057.jpg"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Vitamin c serum top rated</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://mir-s3-cdn-cf.behance.net/project_modules/2800/4e5a2a52981533.5aa8093a86ed4.jpg"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Miss dior perfume new arrivals</p>
                      </div>
                    </Col>
                  </Row>

                </div>
              )}

              {/*fragrance img*/}
              {category === 'fragrances' && (
                <div className="mb-4">
                  <img
                    src="https://img.pikbest.com/backgrounds/20210507/creative-furniture-sales-promotion-banner_5944393.jpg!w700wp"
                    alt="Fragrance Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  <h3 className="text-center mt-4 mb-3 text-product">Mega Blocbluster Sale ,Friday Week</h3>

                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse2.mm.bing.net/th?id=OIP.Do9MguiCYBailpbI_18JwwHaFM&pid=Api&P=0&h=220"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New arrival bedshit 10% off</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse4.mm.bing.net/th?id=OIP.fFNdoM6oAs_8d4esHJHaeQHaE8&pid=Api&P=0&h=220"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New wallpaper best selling </p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse2.mm.bing.net/th?id=OIP.qRUswg1jhiQxLjeVRjHJawHaHa&pid=Api&P=0&h=220"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Top rated table lamp</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.C2OR2GmoAvf4xjWY6u2OiwHaE8&pid=Api&P=0&h=220"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Friday sale 50% off</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.FsE61A9lmbCudEMOfwry2QHaHa&pid=Api&P=0&h=220"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold"> New arrival Trendy lamp</p>
                      </div>
                    </Col>
                  </Row>

                </div>
              )}

              {/*furniture img*/}
              {category === 'furniture' && (
                <div className="mb-4">
                  <img
                    src="https://cdn2.shopify.com/s/files/1/0122/2033/4180/files/grocery_banner.jpg?17421"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}

                  />
                  <h3 className="text-center mt-4 mb-3 ">Most Selling Product</h3>

                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/originals/9a/d6/1f/9ad61fee4b3a0a204051beb30f04b6b1.jpg"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Newst added friday sale</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://excellentfood.com.bd/blog/wp-content/uploads/2022/02/Untitled-1-2-1.jpg"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Make food testy top rated</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/236x/99/38/00/993800befebf4450b7af792705968fe2.jpg?nii=t"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Healthy masale 10% off</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://c8.alamy.com/comp/MGCHJG/poznan-poland-apr-6-2018-bottles-of-global-soft-drink-brands-including-products-of-coca-cola-company-and-pepsico-MGCHJG.jpg"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Flat 50% off summer sale</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse4.mm.bing.net/th?id=OIP.Z2rbbXU5A4uQHYJCzBRfoQHaF_&pid=Api&P=0&h=220"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Avilable Now all flavors-ice-cream</p>
                      </div>
                    </Col>
                  </Row>

                </div>

              )}

              {/*groceries img*/}
              {category === 'groceries' && (
                <div className="mb-4">
                  <img
                    src="https://www.creativefabrica.com/wp-content/uploads/2021/04/26/Creative-Fashion-Sale-Banner-Graphics-11345601-1.jpg"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '600px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/*laptop img*/}
              {category === 'laptops' && (
                <div className="mb-4">
                  <img
                    src="https://img.freepik.com/premium-vector/men-wear-men-style-product-sale-banner-template_753208-23.jpg?w=2000"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  <h3 className="text-center mt-4 mb-3 text-product">Highest Rating Product Mens-Wear</h3>

                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/originals/e5/6b/79/e56b799b365e63c41041feb38fb7e965.jpg"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New arrival demin jacket men</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse4.mm.bing.net/th?id=OIP.xAIWxlAYIvZIA5Xvly8exgHaE7&pid=Api&P=0&h=220"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">T-shirt best selling</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i0.wp.com/www.theunstitchd.com/wp-content/uploads/2018/03/mens-fashion-trends-this-year.jpg?fit=649%2C1078"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Cool waer top rated</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/originals/f8/4c/ad/f84cad0bf37835db5b435b0ee3fbb58f.jpg"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Offer upto 60% off on mens shirt</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse3.mm.bing.net/th?id=OIP.3eE6wXm2x9PXJynfzK96pQHaHa&pid=Api&P=0&h=220"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New arrival 20% off</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/*kichen*/}
              {category === 'kitchen-accessories' && (
                <div className="mb-4">
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/uBpDCSaW7hao59P2DVyxeN-1920-80.jpeg"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/*mens-wtch img*/}
              {category === 'mens-watches' && (
                <div className="mb-4">
                  <img
                    src="https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner-template-design_554907-369.jpg?w=2000"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/*shirt img*/}
              {category === 'mens-shirts' && (
                <div className="mb-4">
                  <img
                    src="https://i.pinimg.com/736x/86/6c/56/866c5677271b5c497beb729f903c8b62.jpg"
                    alt="Furniture Banner"
                    className="img-fluid w-100"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                  <h3 className="text-center mt-4 mb-3 text-product">Our Top Collections</h3>

                  <Row className="text-center mb-5 justify-content-center">
                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/originals/a2/87/29/a28729014c951f640e95dad74707a935.jpg"
                          alt="Watch"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">New arrivals shoes Nike</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://www.gngmodels.com/wp-content/uploads/2022/10/female-footwear-photoshoot-2-682x1024.jpg"
                          alt="Shoes"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Stylish Shoes</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse3.mm.bing.net/th?id=OIP.0jXCixd4B8VHI7CKLs6UIAHaHa&pid=Api&P=0&h=220"
                          alt="Headphones"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Top rated Watch </p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://i.pinimg.com/736x/e0/6d/bf/e06dbfa4febaea3a3735eba741626771--best-watches-advertising.jpg"
                          alt="Makeup"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Sale Event gives 20% off on watches</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={4} md={2}>
                      <div className="p-2 border rounded h-100">
                        <img
                          src="https://tse2.mm.bing.net/th?id=OIP.xxBWG25XsRQsgSr2JfXOawHaHa&pid=Api&P=0&h=220"
                          alt="Bags"
                          className="img-fluid mb-2 w-100"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <p className="fw-semibold">Snikers New arivals</p>
                      </div>
                    </Col>
                  </Row>

                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

      {/* flash sale card */}
      <div className="bg-warning text-dark py-5 mb-5 text-center">
        <h2 className="display-5 fw-bold">Flash Sale - Upto 30% OFF</h2>
        <p className="lead">Limited Time Offers. Grab them now!</p>
        <Link to="/products">
          <Button variant="dark" size="lg">Explore Deals</Button>
        </Link>
      </div>

      {/*end img*/}
      <div className="mb-4">
        <img
          src="https://colorlib.com/wp/wp-content/uploads/sites/2/best-ecommerce-wp-themes.jpg"
          alt="Top Banner"
          className="img-fluid w-100"
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </div>
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

export default Home;