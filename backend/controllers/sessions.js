const Session = require('../models/Session');

exports.createSession = (req, res, next) => {
  delete req.body._id;
  const session = new Session({
    ...req.body,
    exercises: [], // initialise le tableau
  });
  session
    .save()
    .then(() => res.status(201).json({ message: 'Session saved successfully !', session }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { name: req.body.name }, // on ne modifie que le titre
      { new: true },
    );

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Session updated', session: updatedSession });
  } catch (err) {
    console.error('Session update failed :', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Supprimer tous les exercices liés à cette session
    await Exercise.deleteMany({ _id: { $in: session.exercises } });

    // Supprimer la session elle-même
    await Session.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Session and associated exercises deleted' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la session :', err);
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
