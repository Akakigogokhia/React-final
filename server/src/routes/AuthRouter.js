const router = require('express').Router();
const AuthController = require('@controllers/AuthController');
const {
  verifyActivationToken,
  verifyNewPassToken,
} = require('@middlewares/security');
const {
  registrationSchema,
  resetPasswordSchema,
} = require('@middlewares/schemas/auth');
const handleValidationErrors = require('@middlewares/handleValidationErrors');

router.post('/login', AuthController.login);
router.post(
  '/registration',
  [registrationSchema, handleValidationErrors],
  AuthController.registration
);

module.exports = router;
