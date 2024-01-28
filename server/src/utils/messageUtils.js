module.exports = {
  getSuccessmsg: (operation) => ({ msg: `${operation} completed successfully` }),
  getErrormsg: (operation) => ({ msg: `An error occurred during ${operation}` }),
  getNotFoundmsg: (resource) => ({ msg: `${resource} not found` }),
  getDuplicateFieldMsg: (resource, keyPattern) => {
    const [key] = Object.keys(keyPattern);
    return { msg: `${resource} with same ${key} already exists` }
  }
};