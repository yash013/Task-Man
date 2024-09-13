const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Allow CORS preflight requests to pass through
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization header provided"
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "An error occurred while authenticating"
    });
  }
};