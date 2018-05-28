(function () {

    var express = require('express');
    var router = express.Router();
    var commonController = require('../controllers/commonController');

    router.post('/user/register',function (req, res) {
        commonController.registerUser(req,res);
    });

    router.get('/verify',function (req, res) {
        commonController.verifyUser(req,res);
    });

    router.post('/user/login',function (req, res) {
        commonController.login(req,res);
    });

    router.get('/test',function (req, res) {
        console.log(1);
    });

    module.exports = router;

})();