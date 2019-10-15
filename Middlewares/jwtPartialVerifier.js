const verify = (req, res, next) =>{
    // Getting the value of the header that contains the token
    const bearerHeader = req.header['Authorization'];

    //Making sure the header exists
    if (typeof bearerHeader !== 'undefined') {
        //Separating the header according to its structure
        const bearer = bearerHeader.split(' ');

        //Getting the element of the list that contains the token
        const bearerToken = bearer[1];

        //Assingning the token to the req param
        req.token = bearerToken;

        //Continuing application flow
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports.JwtPartialVerifier = verify;