const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');

router.post('/sessions/:sessionId/exercises', exercisesCtrl.addExerciseToSession);
router.put('/:id', exercisesCtrl.modifyExercise);
router.delete('/:id', exercisesCtrl.deleteExercise);
router.get('/:id', exercisesCtrl.getOneExercise);
router.get('/', exercisesCtrl.getAllExercises);

module.exports = router;
