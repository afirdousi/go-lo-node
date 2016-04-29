var express = require('express');
var router = express.Router();

var auth = require('../db/auth');




router.post("/login", function(req, res, next) {  //GET  localhost:3000/auth/login


    var credentials = req.body;


    console.log("HELLO FROM /login...");
    auth
        .login(credentials)
        .then(function(result) {
            console.log("/login :SUCCESS : ", result);
            res.json(result);
        })
        .catch(function(err) {
            console.log("/login :ERROR : ", err);
            next(err);
        });

});

module.exports = router;
