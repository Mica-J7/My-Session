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

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const newExercise = new Exercise(exerciseData);
    await newExercise.save();

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

exports.updateExercise = async (req, res) => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercice non trouvé' });
    }

    res.status(200).json({
      updatedExercise,
      message: 'Exercise updated successfully !',
    });
  } catch (error) {
    console.error('Error in updateExercise :', error);
    res.status(500).json({ message: 'Server error during an exercise update.' });
  }
};

exports.deleteExercise = async (req, res, next) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    await Session.updateOne({ exercises: req.params.id }, { $pull: { exercises: req.params.id } });

    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
