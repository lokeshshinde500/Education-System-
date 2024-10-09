import { Router } from "express";
import examRoutes from "./examRoutes.js";
import {
  createCourse,
  deleteCourse,
  enrollStudent,
  getCourse,
  getCourses,
  removeStudent,
  updateCourse,
} from "../controllers/courseController.js";
import {
  isAdmin,
  isAdminOrTeacher,
  isAdminOrTeacherOrStudent,
} from "../middleware/authenticate.js";
import { upload } from "../models/courseModel.js";
const routes = Router();

// course opearations

// create course
routes.post("/", isAdmin, upload, createCourse);

// get all courses
routes.get("/", isAdminOrTeacherOrStudent, getCourses);

// get single course by id
routes.get("/:id", isAdminOrTeacherOrStudent, getCourse);

// delete single course by id
routes.delete("/:id", isAdmin, deleteCourse);

// update course by id
routes.patch("/:id", isAdmin, upload, updateCourse);

// enroll students in course
routes.post("/:id/enroll", isAdminOrTeacher, enrollStudent);

// enroll students in course
routes.post("/:id/remove", isAdminOrTeacher, removeStudent);

// exams routes
routes.use("/exam", isAdminOrTeacher, examRoutes);

export default routes;
