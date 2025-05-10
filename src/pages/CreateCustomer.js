import React, { useState } from 'react';
import axios from 'axios';
import config from '../StorefrontConfig';
import { Link } from 'react-router-dom';

const CreateCustomer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
  
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCreateCustomer = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Construct the input object for customer creation
      const input = {
        email
      };
  
      const createMutation = `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              firstName
              lastName
              email
              phone
              acceptsMarketing
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `;
      
      let queryData = JSON.stringify({
        query: createMutation,
        variables: { input },
      });
      let apiConfig = config(queryData);

      try {
        // Send the create customer request
        const createResponse = await axios.request(apiConfig);
  
        const { data } = createResponse.data;
        setIsLoading(false);
  
        // Check for user creation errors
        if (data?.customerCreate?.customerUserErrors?.length) {
          setError(data?.customerCreate?.customerUserErrors[0]?.message);
          return;
        }
  
        // Store email and password as a comma-separated string in localStorage
        if(data?.customerCreate?.customer) {
          localStorage.setItem('auto-fill-data', `${email}`);
        }
  
        // Set success message and reset error
        setSuccess(true);
        setError(null);
      } catch (err) {
        setError('An error occurred while creating or logging in the customer.');
      }
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return validateEmail(email) && isTermsChecked;
  };

  return (
    <div className="customer-create-container login-page-wrapper">
      {
        success ? 
          <div className='sucess-conatiner-wrapper'>
            <span className='title'>Alright, now check your inbox!</span>
            <p className='info-text'>We just sent an email to {email}, which contains a special link to complete your registration.</p>
            <p className='info-text'>To proceed, please open the email on this device and click the link!</p>
            <p className='info-text'>Once finished, you can go back to login <a className='link-green' href="/login"><b>here</b></a>.</p>
          </div>
        :
        <>
          <h2 className='container-title'>Create an account</h2>
          <h3 className='existing-user-text'>Existing user? 
            <Link to="/login" className="login-text">Log in</Link>
          </h3>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form className='form-wrappper'
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCustomer();
            }}
          >
            <div className='form-element'>
              <input
              className='input'
                type="email"
                name="email"
                placeholder="Email address*"
                value={email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="terms-check">
              <div className='wrapper-data'>
                <input
                  className="check-box"
                  type="checkbox"
                  defaultChecked
                  id="mktOpt"
                  name="emailMktOptIn"
                />
                <label className="terms-label" htmlFor="mktOpt">
                  Get the latest discounts, product updates, and tips & tricks 2–4x per month. Unsubscribe at any time.
                </label>
              </div>

              <div className='wrapper-data'>
                <input
                  className="check-box"
                  type="checkbox"
                  id="terms"
                  checked={isTermsChecked}
                  onChange={(e) => setIsTermsChecked(e.target.checked)}
                />
                <label className="terms-label" htmlFor="terms">
                  <span>I agree to the </span>
                  <a className='link-green' href="https://www.wyze.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  &amp;{' '}
                  <a className='link-green' href="https://www.wyze.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Statements
                  </a>.
                </label>
              </div>
            </div>

            <button className={`sign-in-button ${!isFormValid() || isLoading ? 'disabled' : ''}`} type="submit" >
              {
                isLoading ? <div className="loader"></div> : 'Continue'
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
        </>
      }
    </div>
  );
};

export default CreateCustomer;
