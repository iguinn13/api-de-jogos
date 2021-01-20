const express = require('express');
const router = express.Router();

const User = require('../models/User'); 

router.post('/users', (req, res) => {
    var { email, senha } = req.body;

    User.create({
        email,
        senha
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.json({error: err});
    });
});

module.exports = router;