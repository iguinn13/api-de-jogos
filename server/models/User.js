const Sequelize = require('sequelize');
const connection = require('../database/Database');

const User = connection.define('users', {
    email:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

User.sync({force: false});

module.exports = User;