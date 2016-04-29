
/**
 * Created by megha on 4/16/2016.
 */


var _ = require('lodash');
var Q = require('q');
var mongodbClient = require('./mongodbClient');
var dbHelpers = require('./dbHelpers');

function Messages() {
}

Messages.prototype = {

    getMessages: function() {
        return dbHelpers
            .getMessageCollection()
            .then(function(collection) {
                
                var criteria = {};
                return Q.when(collection.find(criteria))
                    .then(dbHelpers.resultAsArray)
                    .then(function(data) {
                        return _.map(data, convertToModelObject);

                    });
            });
    },

    getMessages: function(userID) {


        return dbHelpers
            .getMessageCollection()
            .then(function(collection) {
                var criteria = { $or:[ { "sent.userID":userID},{ "received.userID":userID}] };
                return collection.findOne(criteria)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;
                        return data;
                    });
            });
    },

    addMessages: function(messageInfo) {
        return dbHelpers
            .getMessageCollection()
            .then(function(collection) {
                return collection.insert(convertFromModelObject(messageInfo))
                    .then(function(data) {
                        if(messageInfo.userList){
                            return data.result;
                        }else{
                            return { messageId: messageInfo._id.toString() };
                        }
                    });
            });
    },

    updateMessages: function(messageInfo) {
        return dbHelpers
            .getMessageCollection()
            .then(function(collection) {
                var criteria = { "_id": messageInfo.messageId };
                return collection.update(criteria, convertFromModelObject(messageInfo))
                    .then(function(data) {
                        return { messageId: messageInfo._id.toString() };
                    });
            });
    },

    deleteMessages: function(messageId) {
        return dbHelpers
            .getMessageCollection()
            .then(function(collection) {
                var criteria = { "_id": messageId };
                return collection.remove(criteria)
                    .then(function() {
                        return { messageId: messageId };
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
            obj._id = obj.messageId;
            delete obj.messageId;
            obj.createrId = item.createrId;
            users.push(obj);
        });
        item = users;
    }else{
        item._id = item.messageId;
        delete item.messageId;
    }
    return item;
}

module.exports = new Messages();
