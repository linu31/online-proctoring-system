import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createExam,
  DeleteExamById,
  getExams,
} from "../controllers/examController.js";
import {
  createQuestion,
  getQuestionsByExamId,
} from "../controllers/quesController.js";
import {
  getCheatingLogsByExamId,
  saveCheatingLog,
} from "../controllers/cheatingLogController.js";

const examRoutes = express.Router();

// Exams
examRoutes.route("/exam")
  .get(protect, getExams)      // GET all exams
  .post(protect, createExam);  // Create new exam

examRoutes.route("/exam/:examId")
  .delete(protect, DeleteExamById); // Delete exam by ID

// Questions
examRoutes.route("/exam/:examId/questions")
  .get(protect, getQuestionsByExamId)  // Get questions for exam
  .post(protect, createQuestion);      // Add question to exam

// Cheating logs
examRoutes.route("/cheatingLogs/:examId")
  .get(protect, getCheatingLogsByExamId);  // Get cheating logs by exam

examRoutes.route("/cheatingLogs")
  .post(protect, saveCheatingLog);  // Save cheating log

export default examRoutes;
