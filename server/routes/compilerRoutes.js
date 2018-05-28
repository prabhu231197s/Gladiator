(function () {

    var express = require('express');
    var router = express.Router();
    var responseHandler = require('../helpers/responseHandler');

    router.post('/compiletext',function (req,res) {
        console.log(req.body);
        responseHandler.response(res,req.body);
    });

    module.exports = router;

})();