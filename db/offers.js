/**
 * Created by megha on 4/16/2016.
 */
/**
 * Created by afirdousi on 4/16/16.
 */

var _ = require('lodash');
var Q = require('q');
var mongodbClient = require('./mongodbClient');
var dbHelpers = require('./dbHelpers');

function Offers() {
}

Offers.prototype = {

    getOffers: function() {
        return dbHelpers
            .getOfferCollection()
            .then(function(collection) {

                console.log("db/offers / getOffers() : collection ", collection.find);
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

    getOffers: function(offerId) {
        return dbHelpers
            .getOfferCollection()
            .then(function(collection) {
                var criteria = { _id: offerId };
                return collection.findOne(criteria)
                    .then(function(data) {
                        //return data ? convertToModelObject(data) : null;
                        return data;
                    });
            });
    },

    addOffers: function(offerInfo) {
        return dbHelpers
            .getOfferCollection()
            .then(function(collection) {
                return collection.insert(convertFromModelObject(offerInfo))
                    .then(function(data) {
                        if(offerInfo.userList){
                            return data.result;
                        }else{
                            return { offerId: offerInfo._id.toString() };
                        }
                    });
            });
    },

    updateOffers: function(offerInfo) {
        return dbHelpers
            .getOfferCollection()
            .then(function(collection) {
                var criteria = { "_id": offerInfo.offerId };
                return collection.update(criteria, convertFromModelObject(offerInfo))
                    .then(function(data) {
                        return { offerId: offerInfo._id.toString() };
                    });
            });
    },

    deleteOffers: function(offerId) {
        return dbHelpers
            .getOfferCollection()
            .then(function(collection) {
                var criteria = { "_id": offerId };
                return collection.remove(criteria)
                    .then(function() {
                        return { offerId: offerId };
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
            obj._id = obj.offerId;
            delete obj.offerId;
            obj.createrId = item.createrId;
            users.push(obj);
        });
        item = users;
    }else{
        item._id = item.offerId;
        delete item.offerId;
    }
    return item;
}

module.exports = new Offers();
