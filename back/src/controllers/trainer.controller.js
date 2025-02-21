const TrainerService = require('../services/Trainer.service.js');
const PokemonService = require('../services/Pokemon.service.js');
const UserService = require('../services/user.service.js');

const trainerService = new TrainerService();
const userService = new UserService();
const pokemonService = new PokemonService();

exports.getTrainer = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const user = await userService.getUserById(userId);

        const trainer = await trainerService.getTrainerByUserName(user.userName);

        res.status(200).send({ trainer });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const trainerData = req.body;
        const trainer = await trainerService.getTrainerById(req.body._id);

        if (!trainer) {
            return res.status(404).send("Trainer not found");
        }

        updatedTrainer = await trainerService.updateTrainerByUsername(trainer.trainerName, trainerData);

        res.status(200).send({
            message: `Dresseur ${updatedTrainer.trainerName} mis à jour`
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await trainerService.getTrainerById(req.body.id);

        if (!trainer) {
            return res.status(404).send("Trainer not found");
        }

        deletedTrainer = await trainerService.deleteTrainerById(trainer.id);

        res.status(200).send({
            message: `Dresseur ${deletedTrainer.trainerName} supprimé`
        }
        );
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.addTrainer = async (req, res) => {
    try {
        const TrainerData = structuredClone(req.body);

        const existingTrainer = await trainerService.getTrainerByName(TrainerData.trainerName);
        
        if (existingTrainer) {
            return res.status(400).send({
                message: `Le dresseur ${TrainerData.trainerName} existe déjà.`
            });
        }
        
        const trainer = await trainerService.createTrainer(req.auth.userId, TrainerData);

        res.status(200).send({
            message: `Dresseur ${trainer.trainerName} créé avec succès !`
        });

    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }
};


exports.markPokemon = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { pokemonId, isCaptured } = req.body;

        const pokemon = await pokemonService.getPokemonById(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon non trouvé." });
        }

        const trainer = await trainerService.markPokemon(userId, pokemonId, isCaptured);

        res.status(200).send(trainer);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
    }
};
