/**
 * Created by afirdousi on 4/16/16.
 */

var _ = require('lodash');
var Q = require('q');
var mongodbClient = require('./mongodbClient');
var dbHelpers = require('./dbHelpers');

function Auth() {
}

Auth.prototype = {

    login: function(criteria) {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {

                //var criteria = {};
                return Q.when(collection.find(criteria))
                    .then(dbHelpers.resultAsArray)
                    .then(function(data) {
                        return _.map(data, convertToModelObject);

                        //console.log("db/user / getUsers() : data ", collection);
                        //return data;
                    });
            });
    },



    close: mongodbClient.close.bind(mongodbClient)
};





function convertToModelObject(item) {
    item.id = item._id.toString();
    item.userName =  item.username;
    item.name = [item.lastName, ", " ,item.firstName].join('');

    console.log(item);

    delete item._id;
    return item;
}
function convertFromModelObject(item) {
    if(item && item.userList && _.isArray(item.userList)){
        var users = [];
        _.forEach(item.userList, function(obj){
            obj._id = obj.userId;
            delete obj.userId;
            obj.createrId = item.createrId;
            users.push(obj);
        });
        item = users;
    }else{
        item._id = item.userId;
        delete item.userId;
    }
    return item;
}

module.exports = new Auth();
