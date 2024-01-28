import { useEffect, useState } from 'react';
import './myListings.css';
import { useStore } from '../../store/Context';
import EstatePreview from '../estatePreview/EstatePreview';
import HttpListingService from '../../services/HttpListingService';
import { useNavigate } from 'react-router';

const MyListings = () => {
  const { user } = useStore();
  const [userEstates, setUserEstates] = useState([]);
  const navigate = useNavigate();

  const fetchUserListings = () => {
    HttpListingService.getUserListings(user.id).then((response) => {
      setUserEstates(response);
    });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchUserListings();
    }
  }, []);

  return (
    <div className='myListings'>
      {userEstates &&
        userEstates.map((estate) => (
          <EstatePreview
            estate={estate}
            canDelete={true}
            key={estate._id}
            fetch={fetchUserListings}
          />
        ))}
    </div>
  );
};

export default MyListings;
