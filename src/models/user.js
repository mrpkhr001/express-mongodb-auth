const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email : {type : "string", unique: true, lowercase: true},
    password : "string"
});

const ModelClass = mongoose.model("user", UserSchema);

module.exports = ModelClass;