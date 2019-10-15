//Importing express
const express = require('express');

//Importing jwt
const jwt = require('jsonwebtoken');

//Importing partial verifier
const { JwtPartialVerifier } = require('./Middlewares/jwtPartialVerifier');

//Initializing app
const app = express();

//NOt protected route
app.get('/api/dummy', (req, res)=>{
    res.json({message: 'Success, you accessed this route'});
});


//Protected route
app.post('/api/protectedDummy', JwtPartialVerifier, () =>{
    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if (err) {
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Success, you accessed this route',
                data: {request: 'done'}
            });
        }
    });
});


//Login endpoint
app.post('/api/login', () =>{
    //Hard coding the user by now
    const user = {
        id: 1,
        username : 'bard',
        email: 'daecepi@gmail.com'
    };


    jwt.sign({user}, 'secretKey',(err, token) => {
        if (err) {
            
        }
        res.json(token);
    });
})

app.listen(5000);