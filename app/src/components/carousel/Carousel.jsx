import './carousel.css';
import { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='carousel-container'>
      <img
        src={process.env.REACT_APP_SERVER_URL + images[currentImageIndex]}
        alt={`Slide ${currentImageIndex}`}
        className='carousel-image'
      />
      <button onClick={prevImage} className='carousel-button prev-button'>
        ←
      </button>
      <button onClick={nextImage} className='carousel-button next-button'>
        →
      </button>
    </div>
  );
};

export default Carousel;
