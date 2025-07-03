const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    rest: { type: Number },
    note: { type: String, default: '' },
  },
  { timestamps: true },
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
