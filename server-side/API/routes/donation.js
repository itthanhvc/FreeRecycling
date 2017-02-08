var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service');

router.get('/mydonations', function (req, res) {
    dataService.getMyDonations(req.query['email']).then(response => res.json(response))
    .catch(error => res.json(error));
})

router.get('/nearby', function (req, res) {
    dataService.getMyDonations(req.params['long'], req.params['lat']).then(response => res.json(response))
    .catch(error => res.json(error));
})

router.post('/newdonation', function (req, res) {
    console.log("donation router");
    dataService.postNewDonation(req.body.form)
        .then(response => res.json(response))
        .catch(error => res.json(error));
});

module.exports = router;

