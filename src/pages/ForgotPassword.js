import { useState } from "react";

const ForgotPassword = () => {
const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
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
      setTimeout(() => {
        setSuccess(true);
      },1000)
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return validateEmail(email)
  };

  return (
    <div className="customer-create-container login-page-wrapper forgot-page-wrapper">
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
          <h2 className='container-title'>Enter your email address.</h2>
          <p className="sub-text">We'll use this to help reset your password.</p>

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

            <button className={`forgot-button ${!isFormValid() || isLoading ? 'disabled' : ''}`} type="submit" >
              {
                isLoading ? <div className="loader"></div> : 'Continue'
              }
            </button>
          </form>
        </>
      }
    </div>
  )
}

export default ForgotPassword