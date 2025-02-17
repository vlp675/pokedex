const mongoose = require('mongoose');

// Fonction de validation d'URL
const validateUrl = (url) => {
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    return urlRegex.test(url);
};

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    types: { type: [String], required: true },
    description: { type: String, required: false },
    regions: { 
        type: [{ 
            regionName: { type: String, required: true },
            regionPokedexNumber: { type: Number, required: true }
        }]
    },
    imagePath: { 
        type: String, 
        required: true,
        validate: [validateUrl, "URL invalide. Utilisez une URL d'image valide."]
    },
    animatedGif: {
        type: String, 
        required: false,
    },
    soundPath: {
        type: String, 
        required: true,
    },
    height: {
        type: Number, 
        required: true
    },
    weight: {
        type: Number, 
        required: true
    },
});

pokemonSchema.pre('save', function (next) {
    this.types = this.types.map(type => type.toUpperCase());
    next();
});

module.exports = mongoose.model('Pokemons', pokemonSchema);
