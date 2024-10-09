import courseModel from "../models/courseModel.js";
import examModel from "../models/examModel.js";

// add new exam
export const createExam = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not founds!", success: false });
    }

    const { name, link } = req.body;
    // All fields are required

    if (!name || !link) {
      return res
        .status(404)
        .json({ message: "All fields are required!", success: false });
    }

    const newExam = {
      name,
      link,
      course: req.params.id,
      created_by: req.user.id,
    };

    const createExam = await examModel.create(newExam);

    return res.status(201).json({
      message: "Exam created successfully.",
      exam: createExam,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get exams of spacific course
export const getExams = async (req, res) => {
  try {
    const exams = await examModel.find({ course: req.params.id });

    if (!exams) {
      return res
        .status(404)
        .json({ message: "Exam not found!", success: false });
    }

    return res.status(200).json({
      exams: exams,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get single exam
export const getExam = async (req, res) => {
  try {
    const exam = await examModel.findById(req.params.id);

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found!", success: false });
    }

    return res.status(200).json({
      exam: exam,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// delete exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await examModel.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found!", success: false });
    }

    return res.status(200).json({
      message: "Exam deleted successfully.",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// update exam by exam id
export const updateExam = async (req, res) => {
  try {
    const exam = await examModel.findById(req.params.id);

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found!", success: false });
    }
    const { name, link } = req.body;

    // update name and link
    exam.name = name || exam.name;
    exam.link = link || exam.link;

    const updatedExam = await exam.save({ new: true });

    return res.status(200).json({
      exam: updatedExam,
      message: "Exam updated successfully.",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
