var express = require('express');
var router = express.Router();

var offers = require('../db/offers');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({'users':[{ name:"abc" },{ name:"xyz" }]})
//});


router.get("/", function(req, res, next) {

    offers
        .getOffers()
        .then(function(result) {
            console.log("getOffers() :SUCCESS : ", result);
            res.json(result);
        })
        .catch(function(err) {
            console.log("getOffers() :ERROR : ", err);
            next(err);
        });

});

module.exports = router;
