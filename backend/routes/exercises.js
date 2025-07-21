const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');
const auth = require('../middleware/auth');

router.post('/sessions/:sessionId/exercises', auth, exercisesCtrl.addExerciseToSession);
router.put('/:id', auth, exercisesCtrl.updateExercise);
router.delete('/:id', auth, exercisesCtrl.deleteExercise);
router.get('/:id', auth, exercisesCtrl.getOneExercise);
router.get('/', auth, exercisesCtrl.getAllExercises);

module.exports = router;
