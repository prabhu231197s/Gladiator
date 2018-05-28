(function () {

    var userDao = require('../dao/userDao');


    module.exports.registerUser = function (user, callback) {
        userDao.registerUser(user,callback);
    };

    module.exports.fetchHash = function (user, callback) {
        userDao.fetchHash(user,callback);
    };

    module.exports.updateLogin = function (user, callback) {
        userDao.updateLogin(user,callback);
    };

    module.exports.requestCash = function (param, callback) {
        userDao.requestCash(param,callback);
    };

    module.exports.checkRegisterMap = function (email, id, callback) {
        userDao.checkRegisterMap(email,id,callback);
    };

    module.exports.fetchEvent = function (event, category,gender, callback) {
        userDao.fetchEvent(event,category,gender,callback);
    };

    module.exports.registerEvent = function (email, eventid, callback) {
        userDao.registerEvent(email,eventid,callback);
    };

    module.exports.deductCost = function (email, callback) {
        userDao.deductCost(email,callback);
    };

    module.exports.query = function (param, callback) {
        userDao.query(param,callback);
    };

    module.exports.getCash = function (user, callback) {
        userDao.getCash(user,callback);
    }

})();