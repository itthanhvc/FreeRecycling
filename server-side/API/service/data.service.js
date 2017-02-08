var UserEntity = require('../entities/User');
var LocationEntity = require('../entities/Location');
var DonationEntity = require('../entities/Donation');
var Guid = require('guid');
var jwt = require("jsonwebtoken");
var appSettings = require('../app.settings');
var fs = require("fs");
var mongoose = require('mongoose');

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
        LocationEntity.distinct('city', { 'state': state }, function (err, locs) {
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
DataService.prototype.getDonationsByCityAndState = function (city, state) {
    return new Promise((res, rej) => {
        var regexcity = new RegExp(["^", city, "$"].join(""), "i");
        var regexstate = new RegExp(["^", state, "$"].join(""), "i");
        DonationEntity.find({ $and: [{ 'city': regexcity }, { 'state': regexstate }] }, function (err, locs) {
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
DataService.prototype.getNearByDonations = function (long, lat) {
    return new Promise((res, rej) => {
        var geoquery = {
            'location': { '$geoWithin': { '$center': [[long, lat], 10] } }
        };
        DonationEntity.find(geoquery, function (err, locs) {
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
DataService.prototype.getMyDonations = function (email) {
    return new Promise((res, rej) => {
        DonationEntity.find({ 'email': email }, function (err, dons) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(dons);
            }
        });
    })
}
DataService.prototype.getDonationByGuid = function (guid) {
    var id = mongoose.Types.ObjectId(guid);
    return new Promise((res, rej) => {
        DonationEntity.findOne({ '_id': id }, function (err, don) {
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res(don);
            }
        });
    })
}
DataService.prototype.postNewDonation = function (form) {
    const imageId = Guid.create();
    const newImageName = imageId.value + '.jpg';//extension is gonna change
    var donation = new DonationEntity({
        itemName: form.itemName,
        shortDescription: form.shortDescription,
        itemDetails: form.itemDetails,
        email: form.email,
        phone: form.phone,
        category: form.category,
        state: form.state,
        city: form.city,
        location: [parseFloat(form.long), parseFloat(form.lat)],
        long: form.long,
        lat: form.lat,
        imageUrl: "http://localhost:3000/images/profilephoto.jpg" //+ newImageName
    });

    /*fs.writeFile(__dirname + '/../public/images/' + newImageName, form.image, 'binary', function (err) {
        if (err) throw err;
        console.log('Done');
    })*/
    console.log('UTKU'+form.long);
    return new Promise((res, rej) => {
        donation.save(function (err, don) {
            don.save(function (err, don1) {
                res({
                    type: true,
                    data: don1,
                });
            });
        })
    });
}
module.exports = new DataService();