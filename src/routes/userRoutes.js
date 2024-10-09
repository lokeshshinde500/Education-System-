import { Router } from "express";
import {
  isAdmin,
  isAdminOrTeacher,
  isAdminOrTeacherOrStudent,
} from "../middleware/authenticate.js";
import {
  deleteStudent,
  deleteTeacher,
  getStudent,
  getStudents,
  getTeacher,
  getTeachers,
  myCourses,
} from "../controllers/userController.js";
const routes = Router();

// get all teachers list
routes.get("/teachers", isAdmin, getTeachers);

// get all students list
routes.get("/students", isAdminOrTeacher, getStudents);

// get single teacher by id
routes.get("/teacher/:id", isAdmin, getTeacher);

// get single student by id
routes.get("/student/:id", isAdminOrTeacher, getStudent);

// delete a teacher by id
routes.delete("/teacher/:id", isAdmin, deleteTeacher);

// delete a student by id
routes.delete("/student/:id", isAdminOrTeacher, deleteStudent);

// get a student enrolled courses by id
routes.get("/student/myCourses/all", isAdminOrTeacherOrStudent, myCourses);

export default routes;
