(function () {

    var connection = require('../configs/connection');


    module.exports.checkRegistration = function (user, callback) {
        try{
            var query = "SELECT * from users where email=?";
            connection.query(query,[user.email],function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.mapToken = function (param, callback) {
        try{
            var query = "INSERT into tokenMap set ?";
            connection.query(query,param,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.createSession = function (session, callback) {
        try{
            var query = "INSERT into sessionStore set ?";
            connection.query(query,session,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.checkLogin = function (user, callback) {
        try{
            var query = "SELECT * from users where email=?";
            connection.query(query,[user.email],function (err, data) {
                if(err){
                    callback(err);
                }
                else{
                    console.log(data[0]);
                    if(data.length>0){
                        var user = data[0];
                        if(user.loggedin === 1){
                            callback({message:"User already logged in",statusCode:600});
                        }
                        else{
                            if(user.blockflag === 1){
                                callback({message:"User not verified",statusCode:420});
                            }
                            else{
                                callback(null);
                            }
                        }
                    }
                    else{
                        callback({message:"User does not exist",statusCode:420});
                    }
                }
            })
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.verifyUser = function (params, callback) {
        try{
            var query = "SELECT * from tokenMap where email=?";
            connection.query(query,[params.email],function (err, data) {
                if(err){
                    callback(err);
                }
                else{
                    if(data.length>0){
                        var token = data[0].token;
                        if(token === params.token){
                            var query = "UPDATE users set blockflag=0 where email=?";
                            connection.query(query,[params.email],function (err, data) {
                                callback(err,data);
                            });
                        }
                        else{
                            callback({message:"Incorrect link",statusCode:420});
                        }
                    }
                    else{
                        callback({message:"Not a registered user",statusCode:420});
                    }
                }
            });
        }
        catch(err){
            callback(err);
        }
    }

})();