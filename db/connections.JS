var _ = require('lodash');
var Q = require('q');
var mongodbClient = require('./mongodbClient');
var dbHelpers = require('./dbHelpers');


function Connections() {
}

Connections.prototype = {

   
    getFriendList: function(userId) {
        console.log("Inside getFriendList, userId= ", userId);
        return dbHelpers
            .getFriendsCollection()
            .then(function(collection) {
                var criteria = { userID: userId };
                return collection.findOne(criteria)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;
                        return data;
                    });
            });
    },

    getFollowerList: function(userId) {
         return dbHelpers
            . getFriendsCollection()
            .then(function(collection) {
                var criteria = { userId: userId };
                return collection.findOne(criteria)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;
                        return data;
                    });
            });
    }

}

module.exports = new Connections();
