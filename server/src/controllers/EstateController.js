const Estate = require('../models/Estate');
const messages = require('@constants/messages');

exports.addListing = async (req, res) => {
  try {
    const estate = new Estate({
      ...req.body,
      owner: req.user.id,
      images: req.files.map((file) => file.path),
    });
    await estate.save();
    res.status(201).json({ ok: true, ...messages.ADD_LISTING_SUCCESS });
  } catch (error) {
    res.status(400).json(messages.ADD_LISTING_FAIL);
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const estate = await Estate.findByIdAndDelete(id);
    if (!estate) return res.status(404).json({ message: 'Estate not found' });
    res.status(200).json({ message: 'Estate deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserListings = async (req, res) => {
  try {
    const estates = await Estate.find({ owner: req.query.userId });
    res.json(estates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const { keyword } = req.query;
    const estates = await searchEstatesByKeyword(keyword);
    res.json(estates);
  } catch (error) {
    res.status(400).json(messages.GET_LISTINGS_FAIL);
  }
};

const searchEstatesByKeyword = async (keyword) => {
  try {
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { address: { $regex: keyword, $options: 'i' } },
        { type: { $regex: keyword, $options: 'i' } },
      ],
    };

    const estates = await Estate.find(query);
    return estates;
  } catch (error) {
    throw error;
  }
};
