const { AppError } = require("../errors/customErrors");

const errorHandler = (err, req, res, next) => {
  console.error(err); 

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong!"
  });
};

module.exports = errorHandler;
