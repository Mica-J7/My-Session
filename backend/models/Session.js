const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
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
