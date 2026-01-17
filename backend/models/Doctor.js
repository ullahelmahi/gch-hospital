import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      default: [],
    },
    specialization: {
      type: [String],
      default: [],
    },
    visitingSchedule: {
      days: String,
      time: String,
    },
    registrationNo: String,
    hospitalAffiliation: String,
    photo: String, // image URL
    isVisiting: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);