import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "unauthrorized no token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).json({ error: "unauthrorized invalid token" });
    }

    const user =await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "user not found " });
    }

    req.user = user;
    next()
  } catch (error) {
    console.log("error in procted middleware", error);
    res.status(500).json({ error: "intenal server " });
  }
};

export default protectRoute;
