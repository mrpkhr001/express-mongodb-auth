const passport = require('passport');
const User = require('../models/user');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//setup options for JWT Strategy
const jwtOption = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};


//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOption, function(payload /* payload is the jwt token input object */, done){

    //see if user id is present the payload exists in database
    //if exists then call done with that user
    //otherwise call done without user
    User.findById(payload.sub, function(err, user){
        if(err) {
            return done(err, false);
        }

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    })
});

passport.use(jwtLogin);