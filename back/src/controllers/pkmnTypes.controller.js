const PkmnTypeService = require('../services/pkmnType.service.js');

const pkmnTypeService = new PkmnTypeService();

exports.GetTypes = (req, res) => {
    const types = pkmnTypeService.getType();
    res.status(200).json({ data: types.default, count: types.default.length });
}