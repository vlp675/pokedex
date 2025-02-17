const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true 
    },
    imgUrl: {
        type: String,
        default: "" 
    },
    trainerName: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now 
    },
    pkmnSeen: [{
        type: String 
    }],
    pkmnCatch: [{
        type: String 
    }]
});

const trainerModel = mongoose.model('trainers', trainerSchema);
module.exports = trainerModel;
