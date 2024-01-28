const jwt = require('jsonwebtoken');
const messages = require('@constants/messages');
const { checkToken } = require('@utils/securityUtils');

const verifyActivationToken = (req, res, next) => {
  checkToken(req, res);
  let decoded;
  try {
    const [_, token] = req.headers.authorization.split(' ');
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(messages.INVALID_CREDENTIALS);
  }

  return next();
};

module.exports = verifyActivationToken;
