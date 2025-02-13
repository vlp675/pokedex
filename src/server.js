const express = require('express')
const app = express()
const port = 3001
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Gérer les posts
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Types de pokémons
const typesRouter = require('./routes/type.js');
app.use('/api', typesRouter);