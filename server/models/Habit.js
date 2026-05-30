import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "General",
  },

  streak: {
    type: Number,
    default: 0,
  },

  completionDates: {
    type: [Date],
    default: [],
  },

  completed: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{
  timestamps: true,
}
);

const Habit = mongoose.model(
  "Habit",
  habitSchema
);

export default Habit;