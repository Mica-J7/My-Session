const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');

router.post('/', auth, exercisesCtrl.createExercise);
router.put('/:id', auth, exercisesCtrl.modifyExercise);
router.delete('/:id', auth, exercisesCtrl.deleteExercise);
router.get('/:id', auth, exercisesCtrl.getOneExercise);
router.get('/', auth, exercisesCtrl.getAllExercises);

module.exports = router;
