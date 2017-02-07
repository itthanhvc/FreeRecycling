var mongoose = require('mongoose');
var LocationSchema = new mongoose.Schema({
    id: String,
    state: String,
    city: String,
    loc: String,
    pop: String,
});
var Location = mongoose.model('zips', LocationSchema);
module.exports =Location;