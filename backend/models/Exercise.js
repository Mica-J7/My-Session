const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          return typeof value === 'number' || typeof value === 'string';
        },
        message: 'Weight must be a number or a string',
      },
    },
    rest: { type: Number },
    time: { type: Number },
    distance: { type: Number },
    note: { type: String, default: '' },
  },
  { timestamps: true },
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
