import HttpListingService from '../../services/HttpListingService';
import './estatePreview.css';
import { useNavigate } from 'react-router-dom';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const EstatePreview = ({ estate, canDelete, fetch }) => {
  const navigate = useNavigate();

  const deleteListing = (e) => {
    e.stopPropagation();
    HttpListingService.deleteListing(estate._id);
    fetch();
  };

  return (
    <div
      className='estatePreview'
      onClick={() => navigate(`/estate/${estate._id}`)}
    >
      <div className='estatePreview-img'>
        <img className='img' src={serverUrl + estate.images?.[0]} alt='' />
      </div>
      <div className='estatePreview-info'>
        <div className='estatePreview-title'>{estate.title}</div>
        <div className='estatePreview-price'>
          {estate.price?.toLocaleString()} ₾
        </div>
        <div className='estatePreview-address'>📍 {estate.address}</div>
        <div className='estatePreview-desc'>{estate.description}</div>
        <div className='estatePreview-details'>
          <div className='estatePreview-area'>📐{estate.area} მ2</div>
          <div className='estatePreview-rooms'>🚪{estate.rooms}</div>
          <div className='estatePreview-bedrooms'>🛌{estate.bedrooms}</div>
        </div>
      </div>
      {canDelete && (
        <div onClick={(e) => deleteListing(e)} className='delete'>
          <img src='/cancel.png' alt='' />
        </div>
      )}
    </div>
  );
};

export default EstatePreview;
