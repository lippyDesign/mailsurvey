module.exports = (req, res, next) => {
  // if user does not have credits
  if (req.user.credits < 1) {
    // return early and send error message with error code
    return res.status(403).send({ error: 'Not enough credits' });
  }
  // only cgo to next middleware if user has credits, otherwise let request hang
  next();
};