const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
