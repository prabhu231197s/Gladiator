(function () {

    var express = require('express');
    var router = express.Router();
    var userController = require('../controllers/userController');

    router.post('/request/cash',function (req, res) {
        userController.requestCash(req,res);
    });

    router.post('/register/event',function (req, res) {
        userController.registerEvent(req,res);
    });

    router.post('/query',function (req, res) {
        userController.query(req,res);
    });


    router.get('/cash',function (req, res) {
        userController.getCash(req,res);
    })

    module.exports = router;

})();