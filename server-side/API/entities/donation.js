var mongoose = require('mongoose');
var DonationSchema = new mongoose.Schema({
    itemName : String,
    shortDescription : String,
    itemDetails : String,
    email : String,
    phone : String,
    category : String,
    state : String,
    city : String,
    location: [Number],
    long : String,
    lat : String,
    imageUrl : String,
    donationMark : Number
});
var Donation = mongoose.model('donations', DonationSchema);
module.exports = Donation;