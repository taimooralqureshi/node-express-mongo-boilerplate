// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({
      status: 400,
      message: 'Validation failed',
      errors,
    });
  }
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Server error',
  });
};

export default errorHandler;
