const PokemonService = require('../services/pokemon.service.js');

const pokemonService = new PokemonService();

exports.addPokemon = async (req, res) => {
    try {
        if (!req.body.name || !req.body.types || !req.body.imagePath) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis mon coco" });
        }

        const existingPokemon = await pokemonService.getPokemonByName(req.body.name);
        if (existingPokemon) {
            return res.status(400).send({ message: "Ce Pokémon existe déjà." });
        }

        let pokemon = await pokemonService.createPokemon(req.body);

        if (req.body.regions && req.body.regions.length > 0) {
            for (const region of req.body.regions) {
                await pokemonService.createRegion(pokemon._id, region);
            }
        }

        res.status(201).send({
            message: `Pokémon ${pokemon.name} créé avec succès !`
        });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.addRegion = async (req, res) => {
    try {
        if (!req.body.pokemonId || !req.body.region) {
            return res.status(400).send({ message: "Il faut un Pokémon et une région, non mais !" });
        }

        const pokemon = await pokemonService.getPokemonById(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon introuvable." });
        }

        await pokemonService.addRegionToPokemon(pokemonId, region);

        res.status(200).send({ message: `Région ${req.body.region} ajoutée à ${pokemon.name}.` });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
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
            res.status(401).send("Cherche avec une autre API oui !");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getPokemons = async (req, res) => {
    try {
        const pokemons = await pokemonService.getPokemons(req.body);
        res.status(200).send(pokemons);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.deletePokemon = async (req, res) => {
    try {
        const deletedPokemon = await pokemonService.deletePokemonById(req.params.id);

        if (!deletedPokemon) {
            return res.status(404).send({ message: "Pokémon non trouvé." });
        }

        res.status(200).send({ message: "Pokémon supprimé avec succès." });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.updatePokemon = async (req, res) => {
    try {
        await pokemonService.updatePokemonById(req.params.id, req.body);

        res.status(200).send({
            message: `Pokémon ${req.body.name} mis à jour`
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const pkmn = await pokemonService.deleteRegionById(req.params.id, req.body.id_region);

        console.log(req.body.id_region)

        res.status(200).send({
            message: `Pokémon ${pkmn.name} mis à jour avec une région en moins`
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};