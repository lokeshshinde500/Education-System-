import { Router } from "express";
import {
  createExam,
  deleteExam,
  getExam,
  getExams,
  updateExam,
} from "../controllers/examController.js";
const routes = Router();

// add exams by course id
routes.post("/:id", createExam);

// get exams of spacific course by course id
routes.get("/:id", getExams);

// get single exam by exam id
routes.get("/:id/single", getExam);

// get delete exam by exam id
routes.delete("/:id", deleteExam);

// update exam by exam id
routes.patch("/:id", updateExam);

export default routes;
