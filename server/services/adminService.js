(function () {

    var adminDao = require('../dao/adminDao');

    module.exports.updatePayment = function (param, callback) {
        adminDao.updatePayment(param,callback);
    };

    module.exports.updateStatus = function (param, callback) {
        adminDao.updateStatus(param,callback);
    };

    module.exports.getCashRequests = function (callback) {
        adminDao.getCashRequests(callback);
    };

    module.exports.getQueries = function (callback) {
        adminDao.getQueries(callback);
    }

})();