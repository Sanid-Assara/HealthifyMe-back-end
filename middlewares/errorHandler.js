const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  const statusCode = err.statuCode || 500;

  if (process.env.NODE_DEV === "development") {
    return res.status(statusCode).json({
      status: err.status || "error",
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    status: err.status || 500,
    message: err.isOperational ? err.message : "Something went wrong!",
  });
};

export default errorHandler;
