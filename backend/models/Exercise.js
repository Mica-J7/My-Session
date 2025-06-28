const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    informations: { type: String, default: '' },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    rest: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Exercise', exerciseSchema);
