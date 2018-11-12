const passport = require('passport');
const User = require('../models/user');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//setup options for JWT Strategy
const jwtOption = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

//Create local strategy
const localOption = {usernameField : 'email'};
const localLogin = new LocalStrategy(localOption, function(email, password, done){
        //verify this email and password
        //call done with user if it is the correct email and password
        //otherwise call done with false

    User.findOne({email : email}, function(err, user){
        if(err){
            return done(err);
        }

        if(!user){
            return done(null, false);
        }

        //compare password => is given password same as user.passpord?
        user.comparePassword(password, function(err, isMatch){
            if(err){
                return done(err);
            }
            if(!isMatch){
                return done(null, false);
            }
            return done(null, user);
        })

    })
});

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
passport.use(localLogin);

