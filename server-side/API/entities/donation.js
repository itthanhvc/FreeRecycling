var mongoose = require('mongoose');
var DonationSchema = new mongoose.Schema({
    _id : string,
    itemName : string,
    shortDescription : string,
    itemDetails : string,
    email : string,
    phone : string,
    category : string,
    state : string,
    city : string,
    long : string,
    lat : string,
    imageUrl : string
});
var Donation = mongoose.model('donations', DonationSchema);
module.exports = Donation;