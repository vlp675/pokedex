const PkmnType = require('../models/PkmnType.model.js');

class PkmnTypeService {
    getType() {
        return PkmnType;
    }
}

module.exports = PkmnTypeService;