const router = require('express').Router();
const { addEstateSchema } = require('@middlewares/schemas/estate');
const handleValidationErrors = require('@middlewares/handleValidationErrors');
const EstateController = require('@controllers/EstateController');
const verifyAuthToken = require('@middlewares/security/verifyAuthToken');
const upload = require('@config/multer');

router.post(
  '/addListing',
  [verifyAuthToken, upload, addEstateSchema, handleValidationErrors],
  EstateController.addListing
);
router.delete(
  '/deleteListing/:id',
  verifyAuthToken,
  EstateController.deleteListing
);

router.get(
  '/getUserListings',
  verifyAuthToken,
  EstateController.getUserListings
);
router.get('/getAllListings', EstateController.getAllListings);

module.exports = router;
