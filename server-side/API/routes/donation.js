var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service');

router.get('/mydonations', function (req, res) {
    dataService.getMyDonations(req.query['email']).then(response => res.json(response))
        .catch(error => res.json(error));
})
router.get('/getdonationbyguid/:guid', function (req, res) {
    dataService.getDonationByGuid(req.params['guid']).then(response => res.json(response))
        .catch(error => res.json(error));
})
router.post('/nearby', function (req, res) {
    dataService.getNearByDonations(req.body.long, req.body.lat).then(response => res.json(response))
        .catch(error => res.json(error));
})

router.post('/newdonation', function (req, res) {
    console.log("new donation router")
    dataService.postNewDonation(req.body.form)
        .then(response => res.json(response))
        .catch(error => res.json(error));
});

router.post('/images', function(req,res){
    console.log("image server router");
})

module.exports = router;

