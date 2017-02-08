var express = require('express');
var router = express.Router();
var dataService = require('../service/data.service');

router.get('', function (req, res) {
    dataService.getStates().then(response => res.json(response))
        .catch(error => res.json(error));
});
router.get('/:state',function(req,res){
    dataService.getCitiesByState(req.params['state']).then(response=>res.json(response))
    .catch(error=>res.json(error));
});
router.get('/:city/:state',function(req,res){
    dataService.getCitiesByState(req.params['city'],req.params['state']).then(response=>res.json(response))
    .catch(error=>res.json(error));
});
module.exports = router;
