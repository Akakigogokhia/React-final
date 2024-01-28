import { useStore } from '../../store/Context';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Carousel from '../carousel/Carousel';
import './estateDetailed.css';

const EstateDetailed = () => {
  const navigate = useNavigate();
  const { estates } = useStore();
  const { id } = useParams();
  const [estate, setEstate] = useState(null);

  useEffect(() => {
    const currentEstate = estates?.find((estate) => estate._id === id);
    setEstate(currentEstate);
    console.log(currentEstate);
    if (!currentEstate) {
      navigate('/');
    }
  }, []);

  return (
    <div className='estateDetailed'>
      {estate && (
        <>
          <div className='estateDetailed-carousel'>
            <Carousel images={estate.images} />
          </div>

          <div className='estateDetailed-info'>
            <div className='estateDetailed-title'>{estate.title}</div>
            <div className='estateDetailed-price'>
              ფასი - {estate.price?.toLocaleString()} ₾
            </div>
            <div className='estateDetailed-address'>📍 {estate.address}</div>
            <div className='estateDetailed-desc'>{estate.description}</div>
            <div className='estateDetailed-phone'>
              ტელეფონის ნომერი:
              <strong> {estate.phoneNumber}</strong>
            </div>
            <div className='estateDetailed-details'>
              <div className='estateDetailed-area'>
                📐 საერთო ფართი: <strong>{estate.area} მ2</strong>
              </div>
              <div className='estateDetailed-rooms'>
                🚪 ოთახი <strong>{estate.rooms}</strong>
              </div>
              <div className='estateDetailed-bedrooms'>
                🛌 საძინებელი: <strong>{estate.bedrooms}</strong>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EstateDetailed;
