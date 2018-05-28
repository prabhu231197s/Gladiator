(function () {

    var connection = require('../configs/connection');

    module.exports.updatePayment = function (param, callback) {
        try{
            var query = "SELECT * from users where email=?";
            connection.query(query,[param.email],function (err, data) {
                console.log(data);
                console.log(err);
                if(data.length>0){
                    var user = data[0];
                    var ecash = user.ecash;
                    ecash = parseFloat(ecash);
                    ecash = ecash+param.cash;
                    var query = "UPDATE users set ecash = ? where email=?";
                    connection.query(query,[ecash,param.email],function (err, data) {
                        callback(err,data);
                    });
                }
                else{
                    callback({message:"Invalid attempt",error:err,statusCode:420});
                }
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.updateStatus = function (param, callback) {
        try{
            var query = "UPDATE cashrequests set paid=1 where email=? and id=?";
            connection.query(query,[param.email,param.id],function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getCashRequests = function (callback) {
        try{
            var query = "SELECT * from cashrequests where paid=0";
            connection.query(query,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getQueries = function (callback) {
        try{
            var query = "SELECT * from query";
            connection.query(query,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

})();