const Session = require('../models/Session');

exports.createSession = (req, res, next) => {
  delete req.body._id;
  const session = new Session({
    ...req.body,
  });
  session
    .save()
    .then(() => res.status(201).json({ message: 'Session enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySession = (req, res, next) => {
  Session.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Session modifiée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSession = (req, res, next) => {
  Session.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Session supprimée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSession = (req, res, next) => {
  Session.findOne({ _id: req.params.id })
    .then((session) => res.status(200).json(session))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSessions = (req, res, next) => {
  Session.find()
    .then((sessions) => res.status(200).json(sessions))
    .catch((error) => res.status(400).json({ error }));
};
