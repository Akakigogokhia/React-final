const { checkSchema } = require('express-validator');
const { PASSWORD } = require('@constants/regExps');

const changePasswordSchema = checkSchema({
  oldPassword: {
    exists: true,
  },
  newPassword: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 characters long',
    },
    matches: {
      options: PASSWORD,
      errorMessage:
        'Password must contain at least one digit, one uppercase letter, one lowercase letter and one special character.',
    },
    exists: true,
  },
});

module.exports = changePasswordSchema;
