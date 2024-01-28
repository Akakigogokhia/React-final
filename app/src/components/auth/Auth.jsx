import React, { useEffect, useRef, useState } from 'react';
import './auth.css';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../../services/AuthService';
import HttpService from '../../services/HttpAuthService';
import { useStore } from '../../store/Context';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const popupRef = useRef();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { login, showAuthPopup, setShowAuthPopup } = useStore();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = AuthService.validate(formValues, isLogin);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (!isLogin) {
        const response = HttpService.register(formValues);
        response.then((response) => {
          if (response.ok) {
            toggleForm();
            setMessage(response.msg);
          } else {
            setMessage(response.msg);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        });
      } else {
        const response = HttpService.login(formValues);
        response.then((response) => {
          if (response.token) {
            const token = response.token;
            login(jwtDecode(token));
            localStorage.setItem('token', token);
            setShowAuthPopup(false);
          } else {
            const msg = response.msg;
            setMessage(msg);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        });
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAuthPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowAuthPopup]);

  return (
    <>
      {showAuthPopup && (
        <div className='auth-popup'>
          <div ref={popupRef} className='auth'>
            <div className='auth-header'>
              {isLogin ? 'ავტორიზაცია' : 'რეგისტრაცია'}
              <div
                className='auth-close'
                onClick={() => setShowAuthPopup(!showAuthPopup)}
              >
                <img src='/cancel.png' alt='cancel' />
              </div>
            </div>

            <form className='auth-form' onSubmit={handleSubmit}>
              {!isLogin && (
                <div className='auth-username'>
                  <input
                    placeholder='მომხმარებლის სახელი'
                    type='text'
                    id='username'
                    name='username'
                    value={formValues.username}
                    onChange={handleFormChange}
                  />
                  {errors.username && (
                    <span className='error'>{errors.username}</span>
                  )}
                </div>
              )}
              <div className='auth-email'>
                <input
                  placeholder='ელ.ფოსტა'
                  type='text'
                  id='email'
                  name='email'
                  value={formValues.email}
                  onChange={handleFormChange}
                />
                {errors.email && <span className='error'>{errors.email}</span>}
              </div>
              <div className='auth-password'>
                <input
                  placeholder='პაროლი'
                  type='password'
                  id='password'
                  name='password'
                  value={formValues.password}
                  onChange={handleFormChange}
                />
                {errors.password && (
                  <span className='error'>{errors.password}</span>
                )}
              </div>
              {!isLogin && (
                <div className='auth-confirm'>
                  <input
                    placeholder='გაიმეორე პაროლი'
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formValues.confirmPassword}
                    onChange={handleFormChange}
                  />
                  {errors.confirmPassword && (
                    <span className='error'>{errors.confirmPassword}</span>
                  )}
                </div>
              )}
              <button className='auth-submit' type='submit'>
                {isLogin ? 'შესვლა' : 'რეგისტრაცია'}
              </button>
              {message && <span className='auth-success'>{message}</span>}
            </form>
            <button className='auth-switch' onClick={toggleForm}>
              {isLogin
                ? 'არ გაქვს ანგარიში? რეგისტრაცია'
                : 'გაქვს ანგარიში? შესვლა'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthComponent;
