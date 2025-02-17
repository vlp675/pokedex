class PkmnTypeService {
    constructor() {
        this.PokemonModel = require('../models/pokemon.model.js');
        this.bcrypt = require('../../node_modules/bcrypt');
    }

    createPokemon(fields) {
        return this.PokemonModel.create(fields);
    }

    createRegion(pokemonId, region) {
        return this.PokemonModel.findByIdAndUpdate(
            pokemonId,
            { $addToSet: { regions: region } },
            { new: true }
        );
    }

    getPokemonById(id) {
        return this.PokemonModel.findById(id);
    }

    getPokemons(fields) {
        const filter = {};
    
        if (fields.partialName) {
            filter.name = { $regex: fields.partialName, '$options' : 'i'};
        }
    
        if (fields.typeOne) {
            filter.types[0] = fields.typeOne;
        } //A FINIR
    
        if (fields.typeTwo) {
            filter.types[1] = fields.typeTwo;
        } //A FINIR
    
        const page = fields.page ? parseInt(fields.page, 10) : 1;
        const size = fields.size ? parseInt(fields.size, 10) : 20;
        const skip = (page - 1) * size;
    
        return this.PokemonModel.find(filter).skip(skip).limit(size);
    }
    
    getPokemonByName(name) {
        return this.PokemonModel.findOne({ name: name });
    }

    deletePokemonById(id) {
        return this.PokemonModel.deleteOne({ _id: id });
    }

    updatePokemonById(id, updateFields) {
        return this.PokemonModel.updateOne(
            { _id: id },
            { $set: updateFields }
        );
    }

    async deleteRegionById(id, idRegion) {
        if (!idRegion) {
            throw new Error(`ID de région manquant pour le Pokémon ${id}.`);
        }
    
        const pokemon = await this.PokemonModel.findById(id);
    
        if (!pokemon) {
            throw new Error(`Pokémon avec l'ID ${id} non trouvé.`);
        }
    
        const regionExists = pokemon.regions.some(region => region._id.toString() === idRegion);
    
        if (!regionExists) {
            throw new Error(`La région avec l'ID ${idRegion} n'existe pas pour ce Pokémon.`);
        }
    
        const updatedPokemon = await this.PokemonModel.findByIdAndUpdate(
            id,
            { $pull: { regions: { _id: idRegion } } },
            { new: true }
        );
    
        return updatedPokemon;
    }
}

module.exports = PkmnTypeService;