const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
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

module.exports = mongoose.model('Session', sessionSchema);
