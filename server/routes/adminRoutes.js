(function () {

    var express = require('express');
    var router = express.Router();
    var responseHandler = require('../helpers/responseHandler');
    var adminController = require('../controllers/adminController');

    router.post('/login',function (req, res) {
        console.log(req.body);
        if(req.body.username==="admin" && req.body.password==="admin@123"){
            responseHandler.response(res,{message:"Success"});
        }
        else{
            responseHandler.error(res,{message:"Invalid Credentials"});
        }
    });

    router.get('/get/cashrequest',function (req, res) {
        adminController.getCashRequests(req,res);
    });

    router.post('/approve/cash',function (req, res) {
        adminController.acceptPayment(req,res);
    });
    
    router.get('/get/queries',function (req, res) {
        adminController.getQueries(req,res);
    });

    router.post('/reply',function (req, res) {
        adminController.respond(req,res);
    })

    module.exports = router;

})();