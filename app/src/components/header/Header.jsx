import { useEffect, useRef, useState } from 'react';
import './header.css';
import { useStore } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [userPopup, setUserPopup] = useState(false);
  const { user, logout, showAuthPopup, setShowAuthPopup } = useStore();
  const navigate = useNavigate();
  const popupRef = useRef();

  const logoutUser = () => {
    logout();
    setUserPopup(false);
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setUserPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowAuthPopup]);

  const goToMyListings = () => {
    navigate('/myListings');
    setUserPopup(false);
  };

  const goToAddListing = () => {
    if (user) {
      navigate('/addListing');
    } else {
      setShowAuthPopup(true);
    }
  };

  return (
    <div className='header'>
      <div className='header-logo' onClick={() => navigate('/')}>
        <img className='logo-img' src='/logo.png' alt='' />
        <div className='header-name'>შენი სახლი</div>
      </div>
      <div className='header-actions'>
        <div className='button actions-addListing' onClick={goToAddListing}>
          განთავსება
        </div>
        {!user ? (
          <div
            className='button actions-auth'
            onClick={() => setShowAuthPopup(!showAuthPopup)}
          >
            შესვლა
          </div>
        ) : (
          <div
            className='button actions-auth'
            onClick={() => setUserPopup(!userPopup)}
          >
            {user.username}
          </div>
        )}
      </div>
      {userPopup && user && (
        <div ref={popupRef} className='user-popup'>
          <div className='user-personal tab'>
            <div className='username'>{user.username}</div>
            <div className='email'>{user.email}</div>
          </div>
          <div className='user-listings tab' onClick={goToMyListings}>
            ჩემი განცხადებები
          </div>
          <div className='user-logout tab' onClick={logoutUser}>
            გასვლა
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
