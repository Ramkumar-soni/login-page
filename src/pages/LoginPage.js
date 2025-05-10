import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../StorefrontConfig';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    // Reset error messages
    setErrors('');
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    let newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

  if (!password) {
    newErrors.password = 'Password is required';
  } else {
    const wordCount = password.length;
    if (wordCount < 5) {
      newErrors.password = 'Password must contain at least 5 words.';
    }
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { email, password } = formData;
      const loginResponse = await handleLogin(email, password);
      setIsLoading(false);
      if (loginResponse?.success) {
        setSuccess(true);
        setError(null);
        // Redirect to the Account
        navigate('/account');
      } else {
        console.log('Login failed during customer creation.');
      }
    }
  };

  const handleLogin = async (email, password) => {
    const loginMutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const input = {
      email,
      password,
    };
    let queryData = JSON.stringify({
      query: loginMutation,
      variables: { input },
    });
    let apiConfig = config(queryData)
  
    try {
      const loginResponse = await axios.request(apiConfig);
      
      const { data } = loginResponse.data;

      // Check for login errors if API will return error for missing variables
      if (loginResponse?.data?.errors?.length) {
        setSuccess(false);
        setError('Login failed during customer creation.');
        return;
      }

      // Check for login errors
      if (data?.customerAccessTokenCreate?.userErrors?.length) {
        setSuccess(false);
        setError("The username or password is incorrect. Tap Forgot Password? if you need to reset your password.");
        // setError(data?.customerAccessTokenCreate?.userErrors[0]?.message);
        return;
      }

      // Store the access token in localStorage
      const accessToken = data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
      dispatch(login(accessToken));

      return { success: true, data };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false };
    }
  };

  // Check if token is in localStorage on load render and auto-fill the form
  useEffect(() => {
    const autoFillData = localStorage.getItem('auto-fill-data');
    if (autoFillData) {
      const [email, password] = autoFillData.split(',');
      setFormData({ email, password });
    }
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-container login-page-wrapper">
      <h2 className='title-text'>Welcome back, log in</h2>
      <h3 className='new-user-text'>New user? 
        <Link to="/account/register" className="create-account-link-text">Create an account</Link>
      </h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Customer logged in successfully!</p>}

      <form onSubmit={handleSubmit} className='form-wrappper'>
        <div className='form-element'>
          <input
            type="email"
            id="email"
            name="email"
            className='input'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email address*'
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className='form-element'>
          <div className="password-input-wrapper">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              className='input'
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password*'
            />
            <div
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-btn"
            >
              {!isPasswordVisible ? <img src="https://auth.wyze.com/img/password.png" alt="open-eye" /> : <img src="https://auth.wyze.com/img/viewPassword.png" alt="open-eye" /> }
            </div>
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <Link to="/forgot-password" className="forgot-link-text">Forgot password?</Link>

        <button className='submit-btn-wrapper' type="submit">
          {
            isLoading ? <div className="loader"></div> : 'Log in'
          }
        </button>
        <div className='bottom-line-wrapper'><span>or</span></div>
        <div className='login-via-platform-logo-wrapper'>
          <Link to="/forgot-password" className="logo-wrapper">
            <img src="https://auth.wyze.com/img/google_icon.png" alt="Google sign-in" />
          </Link>
          <Link to="/forgot-password" className="logo-wrapper">
            <img src="https://auth.wyze.com/img/apple_icon.png" alt="Apple sign-in" />
          </Link>
          <Link to="/forgot-password" className="logo-wrapper">
            <img src="https://auth.wyze.com/img/fb_icon.png" alt="Facebook sign-in" />
          </Link>
          <Link to="/forgot-password" className="logo-wrapper">
            <img src="https://auth.wyze.com/img/amz_logo.png" alt="Amazon sign-in" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
