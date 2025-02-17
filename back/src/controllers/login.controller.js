exports.Login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const jwt = require('jsonwebtoken');
    const UserService = require('../services/user.service.js');

    if (!email || !password) {
        return res.status(400).json({ message: `Faut remplir son email et son password quand-même` });
    }

    try {
        const userService = new UserService();

        user = await userService.getUserByEmail(email);

        if (user && userService.verifyPassword(password, user.password)) {
            // Génération du token JWT
            const token = jwt.sign(
                { userId: user._id }, 
                process.env.TOKEN_SECRET,
                { expiresIn: '24h' }  
            );

            return res.status(200).json({ message: `Connexion réussie`, userId: user._id, token });
        } else {
            return res.status(400).json({ message: `Identifiants incorrects` });
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return res.status(500).json({ message: `Erreur interne du serveur` });
    }
};
