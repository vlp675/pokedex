const UserService = require('../services/user.service.js');
const bcrypt = require('../../node_modules/bcrypt'); 

const userService = new UserService();

exports.getUser = async (req, res) => {
    try {
        const ObjectId = require("mongoose").Types.ObjectId;

        let user;

        if (ObjectId.isValid(req.params.id_or_email)) {
            user = await userService.getUserById(req.params.id_or_email);
        } else {
            user = await userService.getUserByEmail(req.params.id_or_email);
        }

        if (user.id == req.auth.userId) {
            res.status(200).send({ user });
        } else {
            res.status(401).send("Cherche quelqu'un d'autre salaud");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        await userService.updateUserById(req.params.id, req.body);

        res.status(200).send({
            message: `Utilisateur ${req.body.userName} mis à jour`
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUserById(req.params.id);

        res.status(200).send("Deleted with success");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.addUser = async (req, res) => {
    try {
        let user;
        let userData = structuredClone(req.body);
        try {
            let hash = await bcrypt.hash(userData.password, 10)
            userData.password = hash;
            user = await userService.createUser(userData);
        } catch (error) {
            throw error
        }

        res.status(200).send({
            message: `Utilisateur ${user.userName} crée !`
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.checkUser = (req, res) => {
    res.status(204).send();
};