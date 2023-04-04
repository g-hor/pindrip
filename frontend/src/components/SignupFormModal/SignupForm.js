import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginFormModal/LoginForm';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  const clickSignup = async(e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.signupUser({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        debugger
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const replaceLogin = async (e) => {
    setShowSignup(false);
    setShowLogin(true);
  }

  return (
    <>
      {showSignup && (
        <div className="form-container">
        <form onSubmit={clickSignup}>
          <div className="form-icon-container">
            <img className="unauth-pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
          </div>
          <div className='form-welcome-msg'>Welcome to Pindrip</div>
          <ul className="errors-container">
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <div className="field-label">
            <div>
              Email
            </div>
          </div>
          <div className='input-field'>
            <input
              className="login-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
            <div className="field-label">
              <div>
                Password
              </div>
            </div>
            <div className='input-field'>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
            </div>
          <div className='btn-holder'>
            <input 
              className="login-form-btn" 
              type="submit" 
              value="Continue" 
            />
          </div>
          <div id="form-terms-holder">
            <div id="form-terms-text">
              By continuing, you agree to Pindrip's <a href="https://unsplash.com/images/animals/cat" id="terms-of-service"> Terms of Service </a> and acknowledge that your drip is absolutely immaculate.
            </div>
          </div>
          <div id="form-linebreak">
            <div>
              _________________________
            </div>
          </div>
          <div id="not-member">
            <div>
            Already a member? Log in <span onClick={replaceLogin} id="here-text">here</span>!
            </div>
          </div>
        </form>
      </div>
      )}
      {showLogin && (
        <LoginForm />
      )}
    </>
  );
};

export default SignupForm;