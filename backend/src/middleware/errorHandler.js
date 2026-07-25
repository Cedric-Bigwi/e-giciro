function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'A record with these details already exists.',
      errors: err.errors?.map((e) => e.message)
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: err.errors?.map((e) => e.message)
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.'
  });
}

module.exports = { notFound, errorHandler };
