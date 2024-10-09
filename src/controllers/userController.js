import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";

// get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await userModel.find({ role: "teacher" });

    if (!teachers) {
      return res
        .status(404)
        .json({ message: "teachers not found!", success: false });
    }

    return res.status(200).json({ teachers: teachers, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get all student list
export const getStudents = async (req, res) => {
  try {
    const students = await userModel.find({ role: "student" });

    if (!students) {
      return res
        .status(404)
        .json({ message: "students not found!", success: false });
    }

    return res.status(200).json({ students: students, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get single teacher by id
export const getTeacher = async (req, res) => {
  try {
    const teacher = await await userModel.findOne({
      _id: req.params.id,
      role: "teacher",
    });
    console.log(teacher);
    if (!teacher) {
      return res
        .status(404)
        .json({ message: "teacher not found!", success: false });
    }

    return res.status(200).json({ teacher: teacher, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get single student by id
export const getStudent = async (req, res) => {
  try {
    const student = await userModel.findOne({
      _id: req.params.id,
      role: "student",
    });
    console.log(student);
    if (!student) {
      return res
        .status(404)
        .json({ message: "student not found!", success: false });
    }

    return res.status(200).json({ student: student, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// delete teacher by id
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await userModel.findOne({
      _id: req.params.id,
      role: "teacher",
    });

    if (!teacher) {
      return res
        .status(404)
        .json({ message: "teacher not found!", success: false });
    }

    await userModel.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Teacher deleted successfully.", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

//delete student by id
export const deleteStudent = async (req, res) => {
  try {
    const student = await userModel.findOne({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res
        .status(404)
        .json({ message: "student not found!", success: false });
    }

    await userModel.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Student deleted successfully.", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// Get all courses for a specific student by ID
export const myCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await userModel.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found", success: false });
    }

    const courses = await courseModel.find({ enrolled_by: studentId });

    if (!courses) {
      return res
        .status(404)
        .json({ message: "No courses found for this student", success: false });
    }

    // Return the courses found
    return res.status(200).json({ courses, success: true });
  } catch (error) {
    console.error("Error fetching student courses:", error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
