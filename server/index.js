const express = require('express');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const gamesController = require('./controllers/gamesController');
const usersController = require('./controllers/usersController');

const connection = require('./database/Database');
const Game = require('./models/Game');
const User = require('./models/User');

connection.authenticate().then(() => {
    console.log('Database successfully connected!');
}).catch(err => {
    console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', gamesController);
app.use('/', usersController);

app.listen(8080, () => {
    console.log('Server is running...');
});