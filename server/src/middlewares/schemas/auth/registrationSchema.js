const { checkSchema } = require('express-validator');
const { PASSWORD, USERNAME } = require('@constants/regExps');

const registrationSchema = checkSchema({
  email: {
    errorMessage: 'Invalid email',
    isEmail: true,
    exists: true,
  },
  username: {
    isLength: {
      options: { min: 5 },
      errorMessage: 'username should be at least 5 chars',
    },
    matches: {
      options: USERNAME,
      errorMessage:
        'Username can only contain alphabet characters, numbers, hyphens, and underscores.',
    },
    exists: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
    matches: {
      options: PASSWORD,
      errorMessage:
        'Password must contain at least one digit, one uppercase letter, one lowercase letter and one special character.',
    },
    exists: true,
  },
});

module.exports = registrationSchema;
