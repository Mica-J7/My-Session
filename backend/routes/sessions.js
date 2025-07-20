const express = require('express');
const router = express.Router();
const sessionsCtrl = require('../controllers/sessions');

router.post('/', sessionsCtrl.createSession);
router.put('/:id', sessionsCtrl.updateSession);
router.delete('/:id', sessionsCtrl.deleteSession);
router.get('/:id', sessionsCtrl.getSession);
router.get('/', sessionsCtrl.getAllSessions);

module.exports = router;
