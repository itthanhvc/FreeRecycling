var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service');

router.post('', function (req, res) {
    dataService.getNearByDonations(req.body.lat,req.body.long).then(response => res.json(response))
        .catch(error => res.json(error));
});
module.exports = router;