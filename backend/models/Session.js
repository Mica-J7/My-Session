const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseInSessionSchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },
  sets: Number,
  reps: Number,
  weight: Schema.Types.Mixed,
  rest: Number,
  time: Number,
  distance: Number,
  note: String,
});

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [ExerciseInSessionSchema],
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
