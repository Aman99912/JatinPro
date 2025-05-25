import React from 'react';
import ProductCard from '../../components/ProductCard';
import Services from '../../components/DummyData';
import './Home.css'; // external CSS

function Home() {
  return (
    <div className="homeContainer">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroContent">
          <h1>Your Trusted Home Services</h1>
          <p>Fast, affordable, and professional services at your doorstep.</p>
        </div>
      </section>

      {/* Services Section */}
      <div className="servicesContainer">
        <h2>Our Services</h2>
        <div className="servicesGrid">
          {Services.map((service) => (
            <ProductCard key={service.id} product={service} />
          ))}
        </div>
      </div>
      <footer className="footer">
  <div className="footerContent">
    <div className="footerSection">
      <h3>Systumm Services</h3>
      <p>Delivering trusted home services quickly & professionally.</p>
    </div>

    <div className="footerSection">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div className="footerSection">
      <h4>Contact</h4>
      <p>Email: support@systumm.com</p>
      <p>Phone: +91 98765 43210</p>
      <div className="socialIcons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
      </div>
    </div>
  </div>
  <div className="footerBottom">
    <p>&copy; 2025 Systumm Services. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
}

export default Home;
