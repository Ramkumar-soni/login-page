import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Check if token is in localStorage on initial render and auto-fill the form
    useEffect(() => {
      const token = localStorage.getItem('token');
      // If no token is found, redirect to login page
      if (!token) {
        return navigate('/login');
      }
    }, []);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='account-detail-container'>
      <h2>Hello !</h2>
      <div className='profile-info-wrapper'>
        <span>PROFILE</span>
        <span>PURCHASES</span>
        <span>HELP</span>
      </div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
