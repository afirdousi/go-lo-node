var express = require('express');
var router = express.Router();

var users = require('../db/users');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({'users':[{ name:"abc" },{ name:"xyz" }]})
//});


router.get("/", function(req, res, next) {

    users
        .getUsers()
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          next(err);
        });

});

module.exports = router;
