class PkmnTypeService {
    constructor() {
        this.PokemonModel = require('../models/pokemon.model.js');
        // this.RegionModel = require('../models/region.model.js');
        this.bcrypt = require('../../node_modules/bcrypt');
    }

    async createPokemon(fields) {
        return this.PokemonModel.create(fields);
    }

    async createRegion(fields) {
        // return this.RegionModel.create(fields);
        //A REVOIR DEMANDER PROF SI JE FAIS UN MODEL
        //Faire un service spécialisé ?
    }

    async getPokemonById(id) {
        return this.PokemonModel.findById(id);
    }

    async getPokemonByName(name) {
        return this.PokemonModel.findOne({ name: name });
    }

    async deletePokemonById(id) {
        return this.PokemonModel.deleteOne({ _id: id });
    }

    async updatePokemonById(id, updateFields) {
        return this.PokemonModel.updateOne(
            { _id: id },
            { $set: updateFields }
        );
    }

    async deleteRegionById(id) {
        // return this.RegionModel.deleteOne({ _id: id });
        //A REVOIR DEMANDER PROF SI JE FAIS UN MODEL
        //Faire un service spécialisé ?
    }
}

module.exports = PkmnTypeService;