const express = require('express');
const router = express.Router();
const sessionsCtrl = require('../controllers/sessions');
const auth = require('../middleware/auth');

router.post('/', auth, sessionsCtrl.createSession);
router.put('/:id', auth, sessionsCtrl.updateSession);
router.delete('/:id', auth, sessionsCtrl.deleteSession);
router.get('/:id', auth, sessionsCtrl.getSessionById);
router.get('/', auth, sessionsCtrl.getAllSessions);

module.exports = router;
