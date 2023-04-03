import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const clickLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ email, password }))
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
  };

  const clickDemo = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.loginUser({ email: 'demo@pin.drip', password: 'pindrip' }));
  }

  return (
    <div className="form-container">
      <form onSubmit={clickLogin}>
        <div className="form-icon-container">
          <img className="pindrip-icon" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_pinterest-512.png" alt="pindrip logo" />
        </div>
        <div className='form-welcome-msg'>Welcome to Pindrip</div>
        <ul className="errors-container">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="field-label">Email</div>
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
          <div className="field-label">Password</div>
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
      </form>
    </div>
  );
};

export default LoginForm;