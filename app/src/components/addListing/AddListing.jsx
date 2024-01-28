import React, { useRef, useState } from 'react';
import './addListing.css';
import HttpListingService from '../../services/HttpListingService';

const AddListing = () => {
  const fileInput = useRef();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    rooms: '',
    bedrooms: '',
    phoneNumber: '',
    bathrooms: '',
    area: '',
    type: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });

    images.forEach((image) => {
      uploadData.append('images', image);
    });

    HttpListingService.addListing(uploadData).then((response) => {
      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          price: '',
          address: '',
          bedrooms: '',
          rooms: '',
          phoneNumber: '',
          bathrooms: '',
          area: '',
          type: '',
        });
        setImages([]);
        fileInput.current.value = '';
      }
      setSubmissionMessage(response.msg);

      setIsSubmitting(false);
      setTimeout(() => {
        setSubmissionMessage(null);
      }, 5000);
    });
  };

  return (
    <div className='addListing-container'>
      <form className='addListing' onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='სათაური'
          required
        />
        <textarea
          className='textarea'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='აღწერილობა'
        ></textarea>
        <div className='addListing-price'>
          <input
            className='input'
            type='number'
            min={0}
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='ფასი'
            required
          />
          <div className='gel'>₾</div>
        </div>
        <input
          className='input'
          type='text'
          name='address'
          value={formData.address}
          onChange={handleChange}
          placeholder='მისამართი'
          required
        />
        <input
          className='input'
          type='number'
          name='rooms'
          min={0}
          value={formData.rooms}
          onChange={handleChange}
          placeholder='ოთახები'
          required
        />
        <input
          className='input'
          type='number'
          name='bedrooms'
          min={0}
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder='საძინებელი'
          required
        />
        <input
          className='input'
          type='number'
          name='phoneNumber'
          min={0}
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='ტელეფონის ნომერი'
          required
        />
        <input
          className='input'
          type='number'
          name='bathrooms'
          min={0}
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder='სველი წერტილი'
          required
        />
        <input
          className='input'
          type='number'
          name='area'
          min={0}
          value={formData.area}
          onChange={handleChange}
          placeholder='საერთო ფართი'
          required
        />
        <select
          className='select'
          name='type'
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value=''>აირჩიე ტიპი</option>
          <option value='house'>სახლი</option>
          <option value='apartment'>ბინა</option>
        </select>
        <input
          className='fileInput'
          type='file'
          multiple
          ref={fileInput}
          onChange={handleImageChange}
          accept='image/*'
        />
        <button
          className='addListing-submit'
          type='submit'
          disabled={isSubmitting}
        >
          Submit Listing
        </button>
        {submissionMessage && <p>{submissionMessage}</p>}
      </form>
    </div>
  );
};

export default AddListing;
