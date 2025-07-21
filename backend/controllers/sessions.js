const Session = require('../models/Session');
const Exercise = require('../models/Exercise');

exports.createSession = (req, res, next) => {
  delete req.body._id;
  const session = new Session({
    ...req.body,
    exercises: [], // initialise le tableau
  });
  session
    .save()
    .then(() => res.status(201).json({ message: 'Session saved', session }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    let updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { name: req.body.name }, // on ne modifie que le titre
      { new: true },
    );

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

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

exports.getSession = (req, res, next) => {
  Session.findById(req.params.sessionId)
    .populate('exercises')
    .then((session) => {
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json(session);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSessions = (req, res, next) => {
  Session.find()
    .populate('exercises')
    .then((sessions) => res.status(200).json(sessions))
    .catch((error) => res.status(400).json({ error }));
};
