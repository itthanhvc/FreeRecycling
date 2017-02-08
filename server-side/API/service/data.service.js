var UserEntity = require('../entities/User');
var User = require('../entities/User');
var jwt = require("jsonwebtoken");
var appSettings = require('../app.settings');
function DataService() {

}
DataService.prototype.EnsureAuthorized = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}
DataService.prototype.getUserToken = function (email, password) {
    return new Promise((res, rej) => {
        UserEntity.findOne({ email: email, password: password }, { "password": 0 }, function (err, user) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res({
                        type: true,
                        data: user,
                        token: user.token
                    });
                } else {
                    rej({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    });
}
DataService.prototype.getUser = function (email) {
    return new Promise((res, rej) => {
        UserEntity.findOne({ email: email }, { "password": 0 }, function (err, user) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(user);
            }
        });
    });
}
DataService.prototype.registerUser = function (user) {
    var userModel = new UserEntity({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
    });

    return new Promise((res, rej) => {
        this.getUser(user.email)
            .then(user => {
                if (user != null)
                    return res({
                        type: false,
                        data: "User already exists!"
                    });
                userModel.save(function (err, user) {
                    user.token = jwt.sign(user, appSettings.getConfig('env.JWT_SECRET'));
                    user.save(function (err, user1) {
                        res({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            });
    });
}
module.exports = new DataService();