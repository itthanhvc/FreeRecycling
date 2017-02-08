var UserEntity = require('../entities/User');
var LocationEntity=require('../entities/Location');
var DonationEntity=require('../entities/Donation');
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
DataService.prototype.getStates = function () {
    return new Promise((res, rej) => {
        LocationEntity.distinct('state', function (err, locs) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(locs.sort());
            }
        });
 });
}
DataService.prototype.getCitiesByState = function (state) {
    return new Promise((res, rej) => {
        LocationEntity.distinct('city',{'state':state}, function (err, locs) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(locs.sort());
            }
        });
 });
}
<<<<<<< HEAD
DataService.prototype.getMyDonations = function(email) {
    return new Promise((res, rej) => {

    })
}

DataService.prototype.getNerabyDonations = function(long, lat) {
    return new Promise ((res,rej) => {

    })
}

DataService.prototype.postNewDonation() = function(form) {
    return new Promise ((res,rej) => {

    })
}

=======
DataService.prototype.getDonationsByCityAndState = function (city,state) {
    return new Promise((res, rej) => {
        DonationEntity.find({$and:[{'city':city,$options:"i"},{'state':state,$options:"i"}]}, function (err, locs) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(locs);
            }
        });
 });
}
>>>>>>> 0759cce20573baaedb402c2965d56a9cafbf8681
module.exports = new DataService();