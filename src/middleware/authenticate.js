import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import constant from "../config/constant.js";

export const authenticate = async (req, res, next) => {
  // Get token from the headers
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Login required!", success: false });
  }

  // Verify the token
  jwt.verify(token, constant.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }
    req.user = await userModel.findById(user.userId);
    next();
  });
};

// // only admin access
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Only Admin Access!", sucess: false });
    }
  } catch (error) {
    return res.status(401).send({ message: "Access denined!", success: false });
  }
};

// only teacher access
export const isTeacher = async (req, res, next) => {
  try {
    if (req.user.role === "teacher") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Only Teacher Access!", sucess: false });
    }
  } catch (error) {
    return res.status(401).send({ message: "Access denined!", success: false });
  }
};

// only admin and teacher access
export const isAdminOrTeacher = async (req, res, next) => {
  try {
    if (req.user.role === "teacher" || "admin") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Only Admin or Teacher Access!", sucess: false });
    }
  } catch (error) {
    return res.status(401).send({ message: "Access denined!", success: false });
  }
};

// only admin , teacher and students all have access
export const isAdminOrTeacherOrStudent = async (req, res, next) => {
  try {
    if (req.user.role === "teacher" || "admin" || "student") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Only Admin or Teacher Access!", sucess: false });
    }
  } catch (error) {
    return res.status(401).send({ message: "Access denined!", success: false });
  }
};
