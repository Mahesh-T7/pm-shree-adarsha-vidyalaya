export function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err);

  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.isOperational || !isProduction ? err.message : 'An unexpected server error occurred.',
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
}
