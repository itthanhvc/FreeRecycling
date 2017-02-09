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
        DonationEntity.find({ $and: [{ 'city': regexcity }, { 'state': regexstate }, {'donationMark':0}] }, function (err, locs) {
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
        var query = 'db.runCommand({geoNear:"donations",near:[long,lat]})';
        DonationEntity.collection.geoNear(long, lat, { distanceMultiplier: 3959 }, function (err, docs) {
            var distance = 0;
            var match;
            if (err) {
                rej({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                let result = docs.results.map(data => {
                    let doc = data.obj;
                    doc.dis = data.dis;
                    return doc;
                });
                 console.log(result);
                res(result);
            }
        });
    });
}

DataService.prototype.getMyDonations = function (email) {
    return new Promise((res, rej) => {
        DonationEntity.find({ 'email': email, 'donationMark' : 0 }, function (err, dons) {
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
        donationMark : 0,//not donated yet
        imageUrl: form.imageBase64//__dirname + '/../public/images/' + newImageName
    });

    return new Promise((res, rej) => {
        donation.save(function (err, don) {//changewith save
            don.save(function (err, don1) {
                res({
                    type: true,
                    data: don1,
                });
            });
        })
    });
}

DataService.prototype.markAsDonated = function (id) {
    return new Promise((res, rej) => {
        DonationEntity.update({ '_id': id }, {$set: {donationMark : 1} }, function (err, dons) {
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
module.exports = new DataService();