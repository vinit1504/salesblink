import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "No token provided. Please login again.",
        success: false,
        flag: 0,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token.",
          success: false,
          flag: 0,
        });
      }

      req.user = decoded;

      next();
    });
  } catch (error) {
    console.error("Error in verifyJwtToken:", error);
    res.status(500).json({
      message: "Server error while verifying the token.",
      success: false,
      flag: 0,
    });
  }
};
