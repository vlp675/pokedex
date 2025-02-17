const { getUser } = require('../controllers/user.controller.js');

class TrainerService {
    constructor() {
        this.TrainerModel = require('../models/trainer.model.js');
    }

    async getTrainerById(id) {
        return await this.TrainerModel.findById(id);
    }    

    async getTrainerByName(trainerName) {
        return await this.TrainerModel.findOne({ trainerName });
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
        const UserService = require('../services/user.service.js');
        
        const userService = new UserService();
    
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé la team");
        }
    
        fields.userName = user.userName;

        return await this.TrainerModel.create(fields);
    }
    
}

module.exports = TrainerService;
