const Session = require('../models/Session');
const Exercise = require('../models/Exercise');

exports.createExercise = (req, res, next) => {
  delete req.body._id;
  const exercise = new Exercise({
    ...req.body,
  });
  exercise
    .save()
    .then(() => res.status(201).json({ message: 'Exercise saved successfully !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.addExerciseToSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const exerciseData = req.body;

    const newExercise = new Exercise(exerciseData);
    await newExercise.save();

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.exercises.push(newExercise._id);
    await session.save();

    res.status(201).json({
      message: 'Exercise added to session!',
      exercise: newExercise,
      session,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.modifyExercise = (req, res, next) => {
  Exercise.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Exercise updated successfully !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteExercise = (req, res, next) => {
  Exercise.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Exercise deleted !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneExercise = (req, res, next) => {
  Exercise.findOne({ _id: req.params.id })
    .then((exercise) => res.status(200).json(exercise))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllExercises = (req, res, next) => {
  Exercise.find()
    .then((exercises) => res.status(200).json(exercises))
    .catch((error) => res.status(400).json({ error }));
};
