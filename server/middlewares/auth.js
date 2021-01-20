const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWT_PASS, (error, datas) => {
            if(error){
                res.statusCode = 401;
                res.json({error: 'Invalid Token!'});
            } else {
                req.token = token;
                req.loggedUser = {id: datas.id, email: datas.email};
                next();
            }
        });
    } else {
        res.statusCode = 401;
        res.json({error: 'Invalid token!'});
    }
}