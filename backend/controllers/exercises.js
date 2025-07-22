const Session = require('../models/Session');
const Exercise = require('../models/Exercise');

exports.createExercise = async (req, res) => {
  try {
    // Vérifie que la session appartient bien à l'utilisateur
    const session = await Session.findById(req.body.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const exercise = new Exercise({
      ...req.body,
    });
    await exercise.save();

    res.status(201).json({ message: 'Exercise created', exercise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addExerciseToSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const exerciseData = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Vérification que la session appartient bien à l'utilisateur connecté
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized to add an Exercise in this Session' });
    }

    const newExercise = new Exercise(exerciseData);
    await newExercise.save();

    session.exercises.push(newExercise._id);
    await session.save();

    res.status(201).json({
      message: 'Exercise added to session',
      exercise: newExercise,
      session,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    // On récupère l'exercice
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // On retrouve sa session
    const session = await Session.findOne({ exercises: exercise._id });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // On vérifie l'auth
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      updatedExercise,
      message: 'Exercise updated',
    });
  } catch (error) {
    console.error('Error during update :', error);
    res.status(500).json({ message: 'Server error during an exercise update.' });
  }
};

exports.deleteExercise = async (req, res, next) => {
  try {
    const exerciseId = req.params.id;

    // On cherche la session correspondante
    const session = await Session.findOne({ exercises: exerciseId });

    if (!session) {
      return res.status(404).json({ message: 'Exercise not linked to any session' });
    }

    // On vérifie le userId
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this exercise' });
    }

    // On supprime l'exercice
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // On réaffiche la session sans l'exercice
    await Session.updateOne({ _id: session._id }, { $pull: { exercises: exerciseId } });

    res.status(200).json({ message: 'Exercise deleted' });
  } catch (error) {
    console.error('Error while deleting exercise:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getOneExercise = async (req, res) => {
  try {
    const exerciseId = req.params.id;

    // Trouver la session correspondante
    const session = await Session.findOne({ exercises: exerciseId });

    if (!session) {
      return res.status(404).json({ message: 'Exercise not linked to any session' });
    }

    // Vérifier que l’utilisateur est bien le propriétaire
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized to access this exercise' });
    }

    // Récupérer l’exercice
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error('Error while fetching exercise:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllExercises = async (req, res) => {
  try {
    // Récupérer les sessions de l'utilisateur connecté
    const sessions = await Session.find({ userId: req.auth.userId }).populate('exercises');

    // Extraire tous les exercices
    const allExercises = sessions.flatMap((session) => session.exercises);

    res.status(200).json(allExercises);
  } catch (error) {
    console.error('Error while fetching exercises:', error);
    res.status(500).json({ message: 'Server error while fetching exercises' });
  }
};
