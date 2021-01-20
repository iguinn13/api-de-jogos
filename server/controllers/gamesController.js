const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const auth = require('../middlewares/auth');

router.get('/games', auth ,(req, res) => {
    Game.findAll().then(games => {
        if(games != undefined || games != null){
            res.json(games);
            res.statusCode = 200;
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        res.sendStatus(404);
    });
});

router.post('/games', auth , (req, res) => {
    var title = req.body.title;
    var category = req.body.category;
    var year = req.body.year;
    var price = req.body.price;

    Game.create({
        title,
        category,
        year,
        price
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.statusCode = 400;
        res.json({error: err});
    });
});

router.get('/game/:id', auth , (req, res) => {
    var id = req.params.id;

    Game.findOne({where:{
        id
    }}).then(game => {
        if(game != undefined || game != null){
            res.json(game);
            res.statusCode = 200;
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        console.log(err);
    });
});

router.put('/game/:id', auth , (req, res) => {
    var id = req.params.id;
    var { title, category, year, price } = req.body;

    if(title != undefined){
        Game.update(
            {title},
            {where: {id}}
        ).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }

    if(category != undefined){
        Game.update(
            {category},
            {where: {id}}
        ).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }

    if(year != undefined){
        Game.update(
            {year},
            {where: {id}}
        ).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }

    if(price != undefined){
        Game.update(
            {price},
            {where: {id}}
        ).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
        });
    }
});

router.delete('/game/:id', auth , (req, res) => {
    var id = req.params.id;

    Game.destroy(
        {where: {id}}
    ).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.json({error: err});
    })
});

module.exports = router;