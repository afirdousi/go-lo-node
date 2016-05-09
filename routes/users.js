var express = require('express');
var router = express.Router();

var users = require('../db/users');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({'users':[{ name:"abc" },{ name:"xyz" }]})
//});


router.get("/", function(req, res, next) {

    //console.log("Calling db/getUsers() ...");
    users
        .getUsers()
        .then(function(result) {
            console.log("getUsers() :SUCCESS : ", result);
          res.json(result);
        })
        .catch(function(err) {
            console.log("getUsers() :ERROR : ", err);
          next(err);
        });

});


router.get("/byZip/:zipCode", function(req, res, next) {

    console.log("Calling users/byZip/:zipCode ...");
    users
        .getUserByZip(req.params.zipCode)
        .then(function(result) {
            console.log("getUserByZip() :SUCCESS : ", result);
            res.json(result);
        })
        .catch(function(err) {
            console.log("getUserByZip() :ERROR : ", err);
            next(err);
        });

});

module.exports = router;
