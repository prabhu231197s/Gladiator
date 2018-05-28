(function () {

    var connection = require('../configs/connection');
    var tokenGenerator = require('voucher-code-generator');
    var bcrypt = require('bcrypt');
    var moment = require('moment');
    var commonDao = require('../dao/commonDao');

    module.exports.beginTransaction = function (callback) {
        try{
            connection.beginTransaction(function(err){
                callback(err);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.rollback = function(callback){
        try{
            connection.rollback(function(err){
                callback(err);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.commit = function(callback){
        try{
            connection.commit(function(err){
                callback(err);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.generateToken = function (length, prefix, callback) {
        try{
            var token = tokenGenerator.generate({
                length : length,
                count : 1,
                charset : tokenGenerator.charset("alphanumeric"),
                prefix : prefix
            }).toString().toUpperCase();
            if(token){
                callback(null,token);
            }
            else{
                callback({message:"Error generating token"});
            }
        }
        catch(err){
            callback(err);
        }
    };


    module.exports.generateHash = function (password, callback) {
        try{
            bcrypt.hash(password,10,function (err, hash) {
                if(err){
                    callback(err);
                }
                else{
                    callback(null,hash);
                }
            });
        }
        catch(err){
            callback(err);
        }
    };


    module.exports.checkHash = function (password, pass, callback) {
        try{
            bcrypt.compare(password,pass,function (err, result) {
                if(err){
                    callback(err);
                }
                else{
                    if(result === true){
                        callback(null,true);
                    }
                    else{
                        callback({message:"Invalid Password",statusCode:420});
                    }
                }
            })
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.checkRegistration = function (user, callback) {
        commonDao.checkRegistration(user,callback);
    };

    module.exports.mapToken = function (email, token, callback) {
        generateExpiry(function (exp) {
            var param = {};
            param.email = email;
            param.token = token;
            param.expiry = exp;
            commonDao.mapToken(param,callback);
        });
    };

    module.exports.createSession = function (session, callback) {
        try{
            commonDao.createSession(session,callback);
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.checkLogin = function (user, callback) {
        commonDao.checkLogin(user,callback);
    };

    function generateExpiry(callback) {
        var expiry = 1*(moment(moment.now()).add(2,'hours'));
        callback(expiry);

    }

    module.exports.verifyUser = function (params, callback) {
        try{
            commonDao.verifyUser(params,callback);
        }
        catch(err){
            callback(err);
        }
    }


})();