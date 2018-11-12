const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {type: "string", unique: true, lowercase: true},
    password: "string"
});

//Before save run this middle ware to encrypt the password.
UserSchema.pre("save", function (next) {
    //Access to user model
    const user = this;

    //Generating salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        //Generate hash(encrypted) password with the generated password
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            return next();
        });
    })
});

const ModelClass = mongoose.model("user", UserSchema);

module.exports = ModelClass;