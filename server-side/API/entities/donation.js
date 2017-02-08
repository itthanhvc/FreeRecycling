var mongoose = require('mongoose');
var DonationSchema = new mongoose.Schema({
    _id : String,
    itemName : String,
    shortDescription : String,
    itemDetails : String,
    email : String,
    phone : String,
    category : String,
    state : String,
    city : String,
    long : String,
    lat : String,
    imageUrl : String
});
var Donation = mongoose.model('donations', DonationSchema);
module.exports = Donation;