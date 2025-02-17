const express = require('express');
const router = express.Router();

const trainerController = require('../controllers/trainer.controller');
const authM = require('../middlewares/auth.middleware');
const permM = require('../middlewares/perm.middleware');

router.get('/', authM, trainerController.getTrainer);

router.put('/', authM, trainerController.updateTrainer);

router.delete('/', authM, trainerController.deleteTrainer);

router.post('/', authM, trainerController.addTrainer);

router.post('/mark', authM, trainerController.markPokemon);
module.exports = router;