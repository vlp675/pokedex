const { getUser } = require('../controllers/user.controller.js');

class TrainerService {
  constructor() {
    this.TrainerModel = require('../models/trainer.model.js');
    const UserService = require('../services/user.service.js');
    this.userService = new UserService();
  }

  async getTrainerById(id) {
    return await this.TrainerModel.findById(id);
  }

  async getTrainerByName(trainerName) {
    return await this.TrainerModel.findOne({ trainerName });
  }

  async getTrainerByUserName(userName) {
    return await this.TrainerModel.findOne({ userName });
  }

  async updateTrainerByUsername(trainerName, trainerData) {
    return await this.TrainerModel.findOneAndUpdate(
      { trainerName },
      { $set: trainerData },
      { new: true }
    );
  }

  async deleteTrainerById(id) {
    return await this.TrainerModel.findOneAndDelete({ _id: id });
  }

  async createTrainer(userId, fields) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé l'équipe");
    }
    
    const trainerFields = { ...fields};
  
    if (!trainerFields) {
      trainerFields = {};
    }
  
    trainerFields.userName = user.userName;
  
    return await this.TrainerModel.create(trainerFields);
  }
  

  async markPokemon(userId, pokemonId, isCaptured) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé.");
    }

    let trainer = await this.TrainerModel.findOne({ userName: user.userName });
    if (!trainer) {
      throw new Error("Cet utilisateur n'a pas de trainer");
    }

    let isAlreadySeen = trainer.pkmnSeen.find((p) => p == pokemonId)
      ? true
      : false;

    let isAlreadyCatched = trainer.pkmnCatch.find((p) => p == pokemonId)
      ? true
      : false;

    if (isCaptured === false) {
      if (isAlreadySeen) {
        throw new Error("Ce pokémon a déjà été vu");
      }

      trainer = await this.TrainerModel.findOneAndUpdate(
        { userName: user.userName },
        { $push: { pkmnSeen: pokemonId } },
        { new: true }
      );
    } else {
      if (isAlreadyCatched) {
        throw new Error("Ce pokémon a déjà été capturé");
      }

      const updateFields = isAlreadySeen
        ? { $push: { pkmnCatch: pokemonId } }
        : { $push: { pkmnSeen: pokemonId, pkmnCatch: pokemonId } };

      trainer = await this.TrainerModel.findOneAndUpdate(
        { userName: user.userName },
        updateFields,
        { new: true }
      );
    }

    return trainer;
  }
}

module.exports = TrainerService;
