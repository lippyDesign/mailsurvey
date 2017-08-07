module.exports = (req, res, next) => {
  // if user is not attached to request by passport (if user is not logged in)
  if (!req.user) {
    // return early and send error message with error code
    return res.status(401).send({ error: 'You must log in' });
  }
  // only call next if user is logged in, otherwise let request hang
  next();
};