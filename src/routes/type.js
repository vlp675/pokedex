const express = require('express');
const router = express.Router();

const pkmnTypesController = require('../controllers/pkmnTypes.controller.js');

router.get('/pkmn/types', pkmnTypesController.GetTypes);

module.exports = router;