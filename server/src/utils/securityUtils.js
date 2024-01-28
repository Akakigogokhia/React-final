const jwt = require("jsonwebtoken");

const generateToken = (tokenParams, expTime) => {
  const token = jwt.sign(tokenParams, process.env.SECRET_KEY, {
    expiresIn: expTime,
  });
  return token;
};

const checkToken = (req, res) => {

  if (!req.headers.authorization) {
    throw new Error("NO_AUTH");
  }

  const [type, token] = req.headers.authorization.split(" ");

  if (type !== "Bearer" || !token) {
    throw new Error("INVALID_TOKEN")
  }

  return;
}
module.exports = { generateToken, checkToken }