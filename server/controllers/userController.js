(function () {

    var responseHandler = require('../helpers/responseHandler');
    var transactionHandler = require('../helpers/transactionHandler');
    var userService = require('../services/userService');
    var commonService = require('../services/commonService');


    module.exports.requestCash = function (req, res) {
        try{
            if(req.body.request){
                userService.requestCash(req.body.request,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        responseHandler.response(res,{message:"Successfully raised request."});
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

    module.exports.registerEvent = function (req, res) {
        try{
            var event = req.body.event;
            var email = req.body.email;
            var gender = req.body.gender;
            var category = req.body.category;
            console.log(req.body);
            userService.fetchEvent(event,category,gender,function (err, data) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    if(data.length>0){
                        var eventid = data[0].id;
                        userService.checkRegisterMap(email,eventid,function (err, data) {
                            if(data.length>0){
                                responseHandler.error(res,{message:"Already registered for event",statusCode:600});
                            }
                            else{
                                commonService.beginTransaction(function (err) {
                                    if(err){
                                        responseHandler.error(res,err);
                                    }
                                    else{
                                        userService.registerEvent(email,eventid,function (err, data) {
                                            if(err){
                                                transactionHandler.rollbackHandler(res,err);
                                            }
                                            else{
                                                userService.deductCost(email,function (err, data) {
                                                    if(err){
                                                        transactionHandler.rollbackHandler(res,err);
                                                    }
                                                    else{
                                                        transactionHandler.commitHandler(res,data);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                    else{
                        responseHandler.error(res,{message:"Invalid event",statusCode:400});
                    }
                }
            });
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };

    module.exports.query = function (req, res) {
        try{
            userService.query(req.body,function (err, data) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getCash = function (req, res) {
        try{
            userService.getCash(req.body,function (err, data) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }

            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    }

})();