import jwt from "jsonwebtoken";
import { constants } from "../utils/constants.js";

export const tokencheck = (req, res, next) => {
    try {
        console.log(req);
      const bearerToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(bearerToken, constants.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Forbidden Access"
      });
    }
  };
  
 // export default tokencheck;