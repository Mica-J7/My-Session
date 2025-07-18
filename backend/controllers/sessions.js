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

exports.modifySession = (req, res, next) => {
  Session.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Session updated successfully !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSession = (req, res, next) => {
  Session.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Session deleted !' }))
    .catch((error) => res.status(400).json({ error }));
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
