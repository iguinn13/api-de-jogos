const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('../models/User'); 

router.post('/users', (req, res) => {
    var { email, password } = req.body;

    User.create({
        email,
        password
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.json({error: err});
    });
});

router.post('/aut', (req, res) => {
    var { email, password } = req.body;

    if(email != undefined){
        User.findOne(
            {where: {email: email}}
        ).then(user => {
            if(password == user.password){
                jwt.sign({id: user.id, email: user.email}, process.env.JWT_PASS, {expiresIn: '12h'}, (err, token) => {
                    if(err){
                        res.sendStatus(400);
                    } else {
                        res.statusCode = 200;
                        res.json({token: token});
                    }
                });
            } else {
                res.statusCode = 401;
                res.json({error: 'Invalid credentials'})
            }
        });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;