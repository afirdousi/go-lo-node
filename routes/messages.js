var express = require('express');
var router = express.Router();

var messages = require('../db/messages');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({'users':[{ name:"abc" },{ name:"xyz" }]})
//});


router.get("/", function(req, res, next) {

    messages
        .getMessages()
        .then(function(result) {
            console.log("getMessages() :SUCCESS : ", result);
            res.json(result);
        })
        .catch(function(err) {
            console.log("getMessages() :ERROR : ", err);
            next(err);
        });

});

module.exports = router;
