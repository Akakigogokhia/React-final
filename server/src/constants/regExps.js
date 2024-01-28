module.exports = {
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]+$/,
};
