const express = require('express');
const router = express.Router();

const pkmnController = require('../controllers/pokemon.controller.js');

router.post('/', pkmnController.addPokemon);

router.post('/region', pkmnController.addRegion);

router.get('/:id_or_name', pkmnController.getPokemon);

router.get('/', pkmnController.getPokemons);

router.delete('/:id', pkmnController.deleteRegion);

router.delete('/:id', pkmnController.deletePokemon);

router.patch('/:id', pkmnController.updatePokemon);


module.exports = router;