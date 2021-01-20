const Sequelize = require('sequelize');
const connection = require('../database/Database');

const Game = connection.define('games', {
    title:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    category:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

Game.sync({force: false});

module.exports = Game;