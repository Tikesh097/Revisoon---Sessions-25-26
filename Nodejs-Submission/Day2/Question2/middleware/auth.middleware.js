const authMiddleware = (req, res, next) => {
  const isAuthenticated = req.cookies.auth;

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

module.exports = authMiddleware;
