const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  images: [String],
  phoneNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;
