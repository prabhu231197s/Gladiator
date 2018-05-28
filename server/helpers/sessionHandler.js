(function () {

    var commonService = require('../services/commonService');
    var moment = require('moment');
    var tokenGenerator = require('voucher-code-generator');

    module.exports.createSession = function (user, callback) {
        createSessionParam(user,function (err, param) {
            commonService.createSession(param,function (err, data) {
                callback(err,param);
            });
        });
    };

    function createSessionParam(user, callback) {
        var param = {};
        var sessionToken = tokenGenerator.generate({
            length : 20,
            count : 1,
            charset : tokenGenerator.charset("alphanumeric")
        }).toString();
        var sessionId = tokenGenerator.generate({
            length : 10,
            count : 1,
            charset : tokenGenerator.charset("alphanumeric")
        }).toString();
        param.email = user.email;
        param.sessionid = sessionId;
        param.sessiontoken = sessionToken;
        param.expiry = (moment(moment.now()).add(5,'hours'))*1;
        callback(null,param);
    }

})();