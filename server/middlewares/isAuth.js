import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    
    let token = req.cookies.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Login First" });
    }

    const decodedData = jwt.verify(token, process.env.Jwt_Sec);

    const user = await User.findById(decodedData._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not admin" });
  }
  next();
};
