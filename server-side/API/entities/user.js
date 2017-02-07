var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    token: String,
});
var User = mongoose.model('users', UserSchema);
module.exports =User;