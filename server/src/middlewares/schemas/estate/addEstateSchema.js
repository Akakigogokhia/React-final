const { checkSchema } = require('express-validator');

const estateSchema = checkSchema({
  title: {
    trim: true,
    notEmpty: {
      errorMessage: 'Title is required',
    },
  },
  description: {
    trim: true,
    notEmpty: {
      errorMessage: 'Description is required',
    },
  },
  price: {
    isNumeric: {
      errorMessage: 'Price must be a number',
    },
    notEmpty: {
      errorMessage: 'Price is required',
    },
  },
  address: {
    trim: true,
    notEmpty: {
      errorMessage: 'Address is required',
    },
  },
  rooms: {
    isNumeric: {
      errorMessage: 'Rooms must be a number',
    },
    notEmpty: {
      errorMessage: 'Rooms are required',
    },
  },
  bedrooms: {
    isNumeric: {
      errorMessage: 'Bedrooms must be a number',
    },
    notEmpty: {
      errorMessage: 'Bedrooms are required',
    },
  },
  phoneNumber: {
    isNumeric: {
      errorMessage: 'Bedrooms must be a number',
    },
    notEmpty: {
      errorMessage: 'Phone number is required',
    },
  },
  bathrooms: {
    isNumeric: {
      errorMessage: 'Bathrooms must be a number',
    },
    notEmpty: {
      errorMessage: 'Bathrooms are required',
    },
  },
  area: {
    isNumeric: {
      errorMessage: 'Area must be a number',
    },
    notEmpty: {
      errorMessage: 'Area is required',
    },
  },
  type: {
    trim: true,
    notEmpty: {
      errorMessage: 'Type is required',
    },
  },
  images: {
    optional: true,
    isArray: {
      errorMessage: 'Images should be an array of strings',
    },
    custom: {
      options: (value) => value.every((url) => typeof url === 'string'),
      errorMessage: 'Every image must be a string URL',
    },
  },
});

module.exports = estateSchema;
