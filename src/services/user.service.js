class UserService {
    constructor() {
        this.userModel = require('../models/user.model.js');
        this.bcrypt = require('../../node_modules/bcrypt');
    }

    async getUserById(id) {
        return this.userModel.findById(id);
    }

    async getUserByEmail(email) {
        return this.userModel.findOne({ email: email });
    }

    async updateUserById(id, updateFields) {
        return this.userModel.updateOne(
            { _id: id },
            { $set: updateFields }
        );
    }

    async deleteUserById(id) {
        return this.userModel.deleteOne({ _id: id });
    }

    async createUser(fields) {
        return this.userModel.create(fields);
    }

    verifyPassword(passwordLogin, password) {
        return this.bcrypt.compare(passwordLogin, password);
    }
}

module.exports = UserService;