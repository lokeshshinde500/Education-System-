import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
    required: true,
  },
  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const examModel = mongoose.model("Exam", examSchema);
export default examModel;
