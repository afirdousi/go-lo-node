/**
 * Created by afirdousi on 4/16/16.
 */
 var express = require('express');
var router = express.Router();

var connections = require('../db/connections');


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({'users':[{ name:"abc" },{ name:"xyz" }]})
//});


router.get("/:userID", function(req, res, next) {

 //req.params.userID
    console.log("Calling db/friends()");
    connections
        .getFriendList(req.params.userID)
        .then(function(result) {
            console.log("getFriendList() :SUCCESS : ", result);
          res.json(result);
        })
        .catch(function(err) {
            console.log("getfriendList() :ERROR : ", err);
          next(err);
        });

});

router.get("/followers/:userID", function(req, res, next) {

 //req.params.userID
    //console.log("Calling db/getUsers() ...");
    connections
        .getFollowersList(req.params.userID)
        .then(function(result) {
            console.log("getFollowersList() :SUCCESS : ", result);
          res.json(result);
        })
        .catch(function(err) {
            console.log("getFollowersList() :ERROR : ", err);
          next(err);
        });

});

module.exports = router;

