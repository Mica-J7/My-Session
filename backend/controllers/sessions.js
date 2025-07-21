const Session = require('../models/Session');
const Exercise = require('../models/Exercise');

exports.createSession = async (req, res) => {
  try {
    const newSession = new Session({
      name: req.body.name,
      exercises: [],
      userId: req.auth.userId,
    });

    await newSession.save();

    res.status(201).json({ message: 'Session created', session: newSession });
  } catch (err) {
    res.status(500).json({ message: 'Error during session creation' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    let updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { name: req.body.name }, // on ne modifie que le titre
      { new: true },
    );

    updatedSession = await updatedSession.populate('exercises');

    res.status(200).json({ message: 'Session updated', session: updatedSession });
  } catch (err) {
    console.error('Session update failed :', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    // On récupère la session avec ses exercises
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // On supprime les exercices liés
    await Exercise.deleteMany({ _id: { $in: session.exercises } });

    // Ensuite on supprime la session elle-même
    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({ message: 'Session deleted' });
  } catch (err) {
    console.error('Delete session failed:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId).populate('exercises');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Vérifie que la session appartient bien à l'utilisateur connecté
    if (session.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error getting session by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const userId = req.auth.userId; // récupéré depuis le token
    const sessions = await Session.find({ userId }).populate('exercises');
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
