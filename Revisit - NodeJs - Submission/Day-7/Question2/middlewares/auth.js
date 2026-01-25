function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token || token !== "Bearer mysecrettoken") {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  next();
}

module.exports = auth;
