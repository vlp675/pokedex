const PokemonService = require('../services/pokemon.service.js');

const pokemonService = new PokemonService();

exports.addPokemon = async (req, res) => {
    try {
        const { name, types, imgUrl, regions, description } = req.body;

        if (!name || !types || !imgUrl || !regions) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis mon coco" });
        }

        const existingPokemon = await pokemonService.getPokemonByName(name);
        if (existingPokemon) {
            return res.status(400).send({ message: "Ce Pokémon existe déjà." });
        }

        let pokemon = await pokemonService.createPokemon({ name, types, imgUrl, regions, description });

        res.status(201).send({
            message: `Pokémon ${pokemon.name} créé avec succès !`
        });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.addRegion = (req, res) => {

};

exports.getPokemon = async (req, res) => {
    try {
        const ObjectId = require("mongoose").Types.ObjectId;

        let pokemon;

        if (ObjectId.isValid(req.params.id_or_email)) {
            pokemon = await userService.getPokemonById(req.params.id_or_email);
        } else {
            pokemon = await userService.getPokemonByName(req.params.id_or_email);
        }

        if (user.id == req.auth.userId) {
            res.status(200).send({ pokemon });
        } else {
            res.status(401).send("Cherche quelqu'un d'autre salaud");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getPokemons = (req, res) => {

};

exports.deletePokemon = (req, res) => {

};

exports.updatePokemon = (req, res) => {

};

exports.deleteRegion = (req, res) => {

};