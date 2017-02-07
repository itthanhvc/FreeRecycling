var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service');

router.post('/signup', function (req, res) {
    dataService.registerUser(req.body.user)
        .then(response => res.json(response))
        .catch(error => res.json(error));
});
module.exports = router;
