import { useEffect, useState } from 'react';
import HttpListingService from '../../services/HttpListingService';
import EstatePreview from '../estatePreview/EstatePreview';
import './home.css';
import { useStore } from '../../store/Context';

const Home = () => {
  const { estates, setEstates } = useStore();
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = debounce((event) => {
    setKeyword(event.target.value);
  }, 500);

  useEffect(() => {
    HttpListingService.getAllListings(keyword).then((response) => {
      if (response?.msg) {
        setError(response.msg);
      } else {
        setEstates(response);
      }
    });
  }, [setEstates, keyword]);

  return (
    <div className='home'>
      <div className='search-container'>
        <input
          onChange={handleSearch}
          type='text'
          className='home-search'
          placeholder='search'
        />
      </div>
      {estates && (
        <div className='home-info'>{`მოიძებნა ${estates.length} განცხადება`}</div>
      )}
      <div className='home-estates'>
        {estates?.map((estate) => (
          <EstatePreview estate={estate} key={estate._id} />
        ))}
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  );
};

export default Home;
