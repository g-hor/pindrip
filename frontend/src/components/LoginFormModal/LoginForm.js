import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import SignupForm from '../SignupFormModal/SignupForm';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const clickLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const res = await dispatch(sessionActions.loginUser({ email, password }))
       .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    if (res?.ok) navigate('/home');
  };

  const clickDemo = async (e) => {
    e.preventDefault();
    const res = await dispatch(sessionActions.loginUser({ email: 'demo@pin.drip', password: 'pindrip' }));
    if (res.ok) navigate('/home');
  };

  const replaceSignUp = async (e) => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <>
      {showLogin && (
        <div className="form-container">
          <form onSubmit={clickLogin}>
            <div className="form-icon-container">
              <img className="unauth-pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
            </div>
            <div className='form-welcome-msg'>Welcome to Pindrip</div>
            <div className="errors-container">
              <ul className="errors-list">
                {errors.map(error => <li className='error' key={error}>{error}</li>)}
              </ul>
            </div>
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
                className="login-input password-input"
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
                value="Log In" 
              />
            </div>
            <div id="form-or-text">OR</div>
            <div className='btn-holder'>
              <input 
                className="demo-btn" 
                type="submit" 
                value="Log In as Demo User"
                onClick={clickDemo}
              />
            </div>
            <div id="form-terms-holder">
              <div id="form-terms-text">
                By continuing, you agree to Pindrip's <a href="https://unsplash.com/images/animals/cat" id="terms-of-service" target="_blank" rel="noreferrer" > Terms of Service </a> and acknowledge that your drip is absolutely immaculate.
              </div>
            </div>
            <div id="form-linebreak">
              <div>
                _________________________
              </div>
            </div>
            <div id="not-member">
              <div>
              Not on Pindrip yet? Sign up <span onClick={replaceSignUp} id="here-text">here</span>!
              </div>
            </div>
          </form>
        </div>
      )}
      {showSignup && (
        <SignupForm />
      )}
    </>
  );
};

export default LoginForm;