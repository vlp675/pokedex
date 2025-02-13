const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    types: { type: [String], required: true },
    description: String,
    regions: { 
        type: [{ 
            regionName: { type: String, required: true },
            regionPokedexNumber: { type: Number, required: true }
        }], 
    },
    imgUrl: { type: String, required: true }
});

pokemonSchema.pre('save', function (next) {
    //ON SAIT JAMAIS JE GARDE
    next();
});

const pokemonModel = mongoose.model('Pokemons', pokemonSchema);
module.exports = pokemonModel