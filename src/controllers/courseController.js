import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
import { uploadImage } from "../utils/uploadImage.js";

// create course admin
export const createCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    // All fields are required!
    if (!title || !description || !duration) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const image = req.file;
    // image required
    if (!image) {
      return res
        .status(400)
        .json({ message: "image required!", success: false });
    }

    const result = await uploadImage(req.file.path);

    const newCourse = {
      title,
      description,
      duration,
      image: result.secure_url,
      created_by: req.user.id,
    };

    const createCourse = await courseModel.create(newCourse);

    return res.status(201).json({
      message: "Course created successfully.",
      course: createCourse,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get all courses by admin
export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});

    if (!courses) {
      return res
        .status(404)
        .json({ message: "Courses not founds!", success: false });
    }

    return res.status(200).json({ courses: courses, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get single course by id admin
export const getCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    console.log(req.params.id);
    console.log(course);
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    return res.status(200).json({ course: course, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// delete course by id admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await courseModel.findByIdAndDelete(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    return res
      .status(200)
      .json({ message: "Course deleted successfully.", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// update course by teacher or admin by id
export const updateCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    const { title, description, duration } = req.body;

    const image = { secure_url: course.image };
    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.image = image.secure_url || course.image;

    const updateCourse = await course.save({ new: true });

    return res.status(200).json({
      message: "Course updated successfully.",
      course: updateCourse,

      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// enroll student in course
export const enrollStudent = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    // find course

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    // find student
    const { studentId } = req.body;

    if (!studentId) {
      return res
        .status(404)
        .json({ message: "Student not found!", success: false });
    }

    // is student exits

    const student = await userModel.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found!", success: false });
    }

    // already enroll
    if (course.enrolled_by.includes(studentId)) {
      return res.status(400).json({
        message: "Student is already enrolled in this course.",
        success: false,
      });
    }

    // enroll student
    course.enrolled_by.push(studentId);
    await course.save();

    return res.status(200).json({
      message: "Student enrolled successfully.",
      success: true,
      data: course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// remove student from course
export const removeStudent = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);

    // find course

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    // find student
    const { studentId } = req.body;

    if (!studentId) {
      return res
        .status(404)
        .json({ message: "Student not found!", success: false });
    }

    // is student exits

    const student = await userModel.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found!", success: false });
    }

    // already not on course
    if (!course.enrolled_by.includes(studentId)) {
      return res.status(400).json({
        message: "Student is not enrolled in this course.",
        success: false,
      });
    }

    // remove student
    course.enrolled_by.pop(studentId);
    await course.save();

    return res.status(200).json({
      message: "Student removed successfully.",
      success: true,
      data: course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
