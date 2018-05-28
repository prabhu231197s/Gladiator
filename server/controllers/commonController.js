(function () {

    var commonService = require('../services/commonService');
    var responseHandler = require('../helpers/responseHandler');
    var transactionhandler = require('../helpers/transactionHandler');
    var validator = require('../helpers/validator');
    var config = require('../configs/config.json');
    var userService = require('../services/userService');
    var mailService = require('../services/mailService');
    var bcrypt = require('bcrypt');
    var sessionHandler = require('../helpers/sessionHandler');

    module.exports.registerUser = function (req, res) {
        try{
            if(req.body.user){
                var user = req.body.user;
                validator.nullCheck(user,function (err, data) {
                    if(err){
                        responseHandler.error(res,{message:"Null field detected",statusCode:400});
                    }
                    else{
                        commonService.beginTransaction(function (err) {
                            if(err){
                                responseHandler.error(res,err);
                            }
                            else{
                                commonService.checkRegistration(user,function (err, data) {
                                    if(err){
                                        transactionhandler.rollbackHandler(res,err);
                                    }
                                    else{
                                        if(data.length>0){
                                            transactionhandler.rollbackHandler(res,{message:"User already exists",statusCode:500});
                                        }
                                        else{
                                            commonService.generateHash(user.password,function (err, hash) {
                                                if(err){
                                                    transactionhandler.rollbackHandler(res,err);
                                                }
                                                else{
                                                    user.password = hash;
                                                    userService.registerUser(user,function (err, data) {
                                                        if(err){
                                                            transactionhandler.rollbackHandler(res,err);
                                                        }
                                                        else{
                                                            commonService.generateToken(30,"",function (err, token) {
                                                                if(err){
                                                                    transactionhandler.rollbackHandler(res,err);
                                                                }
                                                                else{
                                                                    commonService.mapToken(user.email,token,function (err, data) {
                                                                        if(err){
                                                                            transactionhandler.rollbackHandler(res,err);
                                                                        }
                                                                        else{
                                                                            var link = "http://localhost:"+config.port+"/action/verify?email="+user.email+"&&token="+token;
                                                                            console.log(link);
                                                                            mailService.sendVerificationLink(user.email,link,function (err, data) {
                                                                                if(err){
                                                                                    transactionhandler.rollbackHandler(res,err);
                                                                                }
                                                                                else{
                                                                                    transactionhandler.commitHandler(res,{message:"Success"});
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else{
                responseHandler.error(res,{message:"Empty request body",statusCode:400});
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };


    module.exports.login = function (req, res) {
        try{
            console.log(req.body);
            if(req.body.user){
                var user = req.body.user;
                validator.nullCheck(user,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        commonService.checkLogin(user,function (err, data) {
                            if(err){
                                responseHandler.error(res,err);
                            }
                            else{
                                userService.fetchHash(user,function (err, data) {
                                    if(err){
                                        responseHandler.error(res,err);
                                    }
                                    else{
                                        if(data.length>0){
                                            var dat = data[0];
                                            var hash = data[0].password;
                                            commonService.checkHash(user.password,hash,function (err, result) {
                                                if(err){
                                                    responseHandler.error(res,err);
                                                }
                                                else{
                                                    commonService.beginTransaction(function (err) {
                                                        if(err){
                                                            responseHandler.error(res,err);
                                                        }
                                                        else{
                                                            if(result === true){
                                                                sessionHandler.createSession(user,function (err, session) {
                                                                    if(err){
                                                                        transactionhandler.rollbackHandler(res,err);
                                                                    }
                                                                    else{
                                                                        userService.updateLogin(user,function (err, data) {
                                                                            if(err){
                                                                                transactionhandler.rollbackHandler(res,err);
                                                                            }
                                                                            else{
                                                                                dat.session = session;
                                                                                transactionhandler.commitHandler(res,dat);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                            else{
                                                                responseHandler.error(res,{message:"Something went wrong"});
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else{
                                            responseHandler.error(res,{message:"User not yet registered",statusCode:420});
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else{
                responseHandler.error(res,{message:"Empty body",statusCode:400});
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };


    module.exports.verifyUser = function (req, res) {
        try{
            if(req.query){
                var params = req.query;
                commonService.verifyUser(params,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        responseHandler.response(res,{message:"Success",statusCode:200});
                    }
                });
            }
            else{
                responseHandler.error(res,{message:"Incomplete link"});
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    }

})();