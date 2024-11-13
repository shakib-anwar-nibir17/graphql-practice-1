import jwt from "jsonwebtoken";

export const decodeJWTToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token signature");
    } else {
      throw new Error("Invalid token");
    }
  }
};
