const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authM = require('../middlewares/auth.middleware');
const permM = require('../middlewares/perm.middleware');

router.get('/check_user', authM, userController.checkUser);

router.get('/:id_or_email', authM, permM.fonction_to_use_in_router(this.param), userController.getUser);

router.get('/', authM, userController.getUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/', userController.addUser);
module.exports = router;