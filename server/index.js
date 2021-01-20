const express = require('express');
const app = express();
const gamesController = require('./controllers/gamesController');
const connection = require('./database/Database');
const Game = require('./models/Game');

connection.authenticate().then(() => {
    console.log('Database successfully connected!');
}).catch(err => {
    console.log(err);
});

app.use('/games', gamesController);

app.listen(8080, () => {
    console.log('Server is running...');
});