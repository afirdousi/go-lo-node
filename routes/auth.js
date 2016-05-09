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


//var oauthserver = require('oauth2-server');
//var appUserHelper = require('../service/appUserHelper');
//var ldapLookup;
//
//var model = webSettings.testMode ?
//    require('../services/testModeUserModel')(webSetting) :
//
//app.oauth = oauthserver({
//    model: model,
//    grants: ['password'],
//    debug: false
//});
//app.all(webSettings.contextRoot + '/oauth/token', app.oauth.grant());
//
//if(webSettings.testMode) {
//
//    app.use(webSettings.contextRoot + "/api/is-server-in-test-mode", function(req, res) {
//        res.json({
//            isTestMode: true
//        });
//    });
//
//    app.get(webSettings.contextRoot + "/auth/user", app.oauth.authorise(), function(req, res) {
//        res.json([
//            {'Name': 'Some User', 'Id': 'SomeUserId'},
//            {'Name': 'Some Other User', 'Id': 'SomeOtherUserId'},
//            {'Name': 'Yet Another User', 'Id': 'YetAnotherUserId'}
//        ]);
//    });
//
//}
//else {
//
//    ldapLookup = require('../services/ldapLookup')(webSettings);
//
//
//    app.get(webSettings.contextRoot + "/auth/user", app.oauth.authorise(), function(req, res, next) {
//
//        var appUser = appUserHelper(req);
//        if (!appUser.isInAdminRole) {
//            res.sendStatus(403);
//        }
//        else {
//            ldapLookup
//                .searchUsers(req.query.LDAPName)
//                .then(function (result) {
//                    res.json(result);
//                })
//                .catch(function (err) {
//                    next(err);
//                });
//        }
//    });
//}


module.exports = router;
