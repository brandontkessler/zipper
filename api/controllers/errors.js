const notFound = (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
}

const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Problems"
    }
  })
}

module.exports = {
  notFound,
  errorHandler
};