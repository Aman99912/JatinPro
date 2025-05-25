import React from 'react';
import './navbar.css';


const Navbar = () => {
  return (
    <div className="nav">
      <div className="container">
        {/* <img src={logo} alt="Logo" className="logo" /> */}

        <div className="btn">Home</div>
        <div className="btn">Contact</div>
        <div className="btn">About</div>
        <div className="btn">FAQ</div>
        <div className="btn">Logout</div>

        <svg
          className="outline"
          overflow="visible"
          width={500}
          height={60}
          viewBox="0 0 500 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="rect"
            pathLength={100}
            x={0}
            y={0}
            width={500}
            height={60}
            fill="transparent"
            strokeWidth={4}
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
