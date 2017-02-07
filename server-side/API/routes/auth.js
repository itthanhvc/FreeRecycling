var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service')
/* GET home page. */
router.post('/', function (req, res) {
  dataService.getUserToken(req.body.username, req.body.password)
    .then(response => res.json(response))
    .catch(err => res.json(err))
});

module.exports = router;
