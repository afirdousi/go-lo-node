/**
 * Created by afirdousi on 4/16/16.
 */

var _ = require('lodash');
var Q = require('q');
var mongodbClient = require('./mongodbClient');
var dbHelpers = require('./dbHelpers');

function Users() {
}

Users.prototype = {

    getUsers: function() {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {

                var criteria = {};
                return Q.when(collection.find(criteria))
                    .then(dbHelpers.resultAsArray)
                    .then(function(data) {
                        return _.map(data, convertToModelObject);

                        //console.log("db/user / getUsers() : data ", collection);
                        //return data;
                    });
            });
    },

    getUser: function(userId) {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {
                var criteria = { _id: userId };
                return collection.findOne(criteria)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;
                        return data;
                    });
            });
    },


    getUserByZip: function(zipCode) {
        console.log("getUserByZip called with parameter :",zipCode);
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {
                var criteria = { zip: parseInt(zipCode) };
                return collection.find(criteria)
                    .then(dbHelpers.resultAsArray)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;

                        console.log("getUserByZip:",data);

                        return _.map(data, convertToModelObject);


                       // return data;
                    });
            });
    },


    addUser: function(userInfo) {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {
                return collection.insert(convertFromModelObject(userInfo))
                    .then(function(data) {
                        if(userInfo.userList){
                            return data.result;
                        }else{
                            return { userId: userInfo._id.toString() };
                        }
                    });
            });
    },

    updateUser: function(userInfo) {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {
                var criteria = { "_id": userInfo.userId };
                return collection.update(criteria, convertFromModelObject(userInfo))
                    .then(function(data) {
                        return { userId: userInfo._id.toString() };
                    });
            });
    },

    deleteUser: function(userId) {
        return dbHelpers
            .getUserProfileCollection()
            .then(function(collection) {
                var criteria = { "_id": userId };
                return collection.remove(criteria)
                    .then(function() {
                        return { userId: userId };
                    });
            });
    },

    close: mongodbClient.close.bind(mongodbClient)
};

function convertToModelObject(item) {
    console.log(item);
    //item.id = item._id.toString();
    item.name =  item.firstName + item.lastName;

    console.log("convertToModelObject item : ",item);

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

module.exports = new Users();
