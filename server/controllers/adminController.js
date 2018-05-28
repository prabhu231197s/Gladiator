(function () {

    var responseHandler = require('../helpers/responseHandler');
    var transactionHandler = require('../helpers/transactionHandler');
    var adminService = require('../services/adminService');
    var commonService = require('../services/commonService');
    var mailService = require('../services/mailService');


    module.exports.acceptPayment = function (req, res) {
        try{
            commonService.beginTransaction(function (err) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    adminService.updatePayment(req.body,function (err, data) {
                        if(err){
                            transactionHandler.rollbackHandler(res,err);
                        }
                        else{
                            adminService.updateStatus(req.body,function (err, data) {
                                if(err){
                                    transactionHandler.rollbackHandler(res,err);
                                }
                                else{
                                    transactionHandler.commitHandler(res,{message:"Sucess"});
                                }
                            });
                        }
                    });
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getCashRequests = function (req, res) {
        try{
            adminService.getCashRequests(function (err, data) {
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

    module.exports.getQueries = function (req, res) {
        try{
            adminService.getQueries(function (err, data) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            })
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.respond = function (req, res) {
        try{
            var mail = req.body.email;
            var text = req.body.text;

            mailService.sendReply(mail,text,function (err, data) {
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