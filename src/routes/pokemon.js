const express = require('express');
const router = express.Router();

const pkmnController = require('../controllers/pokemon.controller.js');

router.post('/', pkmnController.addPokemon);

router.post('/region', pkmnController.addRegion);

router.get('/:id_or_email', pkmnController.getPokemon);

router.get('/', pkmnController.getPokemons);

router.delete('/:id', pkmnController.deletePokemon);

router.put('/:id', pkmnController.updatePokemon);

router.delete('/:id', pkmnController.deleteRegion);

module.exports = router;