const jwt = require('jsonwebtoken');
const messages = require('@constants/messages');
const { checkToken } = require('@utils/securityUtils');

const verifyAuthToken = (req, res, next) => {
  let decoded;
  try {
    checkToken(req, res);
  } catch (error) {
    return res.status(400).send(messages[error.message]);
  }

  try {
    const [_, token] = req.headers.authorization.split(' ');
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send(messages.INVALID_CREDENTIALS);
  }

  if (decoded['type'] !== 'auth')
    return res.status(400).send(messages.INVALID_TOKEN);

  req.user = decoded;
  return next();
};

module.exports = verifyAuthToken;
