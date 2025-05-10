import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="header header-inner-wrapper">
      <div className='wrapper'>
        <div className='left-part'>
          <ul className="horizontal-list-wrapper">
            <li className="main-link" data-type="rare-rabbit">
              <a href="/collections/lucent-aman-collections" className="parent-link" data-entered="true">Men</a>
            </li>
            <li className="main-link" data-type="rareism">
              <a href="/collections/lucent-krunal-test" className="parent-link" data-entered="true">Women</a>
            </li>
            <li className="main-link" data-type="rare-kid">
              <a href="/" className="parent-link" data-entered="true">Kids</a>
            </li>
            <li className="main-link" data-type="rare-rabbit">
              <a href="/" className="parent-link" data-entered="true">footwear</a>
            </li>
          </ul>
        </div>
        <div className='middle-part-wrapper'>
          <a href="/" className="brand-image home-image">
            <img alt="logo" className='header-logo' src="https://www.wyze.com/cdn/shop/files/wyze_white_logo.svg?v=1698293459&width=135" />
          </a>
        </div>
        <div className="right-part">
          <ul className="second-nav-inner">  
          <li className="second-nav-content">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="nav-item">Account</Link>
                </>
                ) : (
                  <Link to="/login" className="nav-item">Login</Link>
              )}
            </li>
            <li className="second-nav-content">
              <a href="/" className="wishlist-button" aria-label="WISHLIST">Wishlist <span className="topbadge"></span></a>
            </li>
            <li className="second-nav-content">
              <a className="header-cart-btn cart-btn">Bag (<span className="Header__CartCount cart-count">0</span>)</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header