const Sequelize = require('sequelize');

const connection = new Sequelize('db_api_jwt', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;