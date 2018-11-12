const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

module.exports.signin = function (req, res, next) {
    //User has already had their email and password authenticated
    //We just need to create token and return
    res.send({token : tokenForUser(req.user)});
};

module.exports.signup = function (req, res, next) {
    const email = req.body.email,
        password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: "Email and password are required"});
    }

    User.findOne({email}, (err, existingUser) => {

        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({error: "User with same email id already exists"});
        }

        const user = new User({email, password});

        user.save(error => {
            console.log("saved user", user);
            if (error) {
                return next(error);
            }
            res.status(201).json({success: true, token: tokenForUser(user)});
        });

    });

};