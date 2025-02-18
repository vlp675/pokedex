const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

//Types de pokémons
const typesRouter = require('./routes/type.js');
app.use('/api', typesRouter);

//User
const UserRouter = require('./routes/users.js');
app.use('/api/users', UserRouter);

//Trainer
const TrainerRouter = require('./routes/trainer.js');
app.use('/api/trainer', TrainerRouter);

// const keygen = require('./keygen.js');

//Login
const LoginRouter = require('./routes/login.js');
app.use('/api/login', LoginRouter);

//Pokemon
const PokemonRouter = require('./routes/pokemon.js');
app.use('/api/pkmn', PokemonRouter);

//Connexion à la BDD
mongoose.connect('mongodb://127.0.0.1:27017/pokedex')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log(err));