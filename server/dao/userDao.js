(function () {

    var connection = require('../configs/connection');

    module.exports.registerUser = function (user, callback) {
        try{
            console.log(user);
            var query = "INSERT into users set ?";
            connection.query(query,user,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.fetchHash = function (user, callback) {
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

    module.exports.updateLogin = function (user, callback) {
        try{
            var query = "UPDATE users set loggedin=1 where email=?";
            connection.query(query,[user.email],function (err, data) {
                callback(err,data);
            })
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.requestCash = function (param,callback) {
        try{
            var query = "INSERT into cashrequests set ?";
            connection.query(query,param,function (err, data) {
                callback(err,data);
            });
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.checkRegisterMap = function (email, id, callback) {
        try{
            var q = "SELECT * from eventmap where email=? and event=?";
            connection.query(q,[email,id],function (err, data) {
                callback(err,data);
            });
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.fetchEvent = function (event, category,gender, callback) {
        try{
            var query = "SELECT id from events where eventname=? and category=? and gender=?";
            console.log(query);
            connection.query(query,[event,category,gender],function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.registerEvent = function (email, id, callback) {
        try{
            var param = {};
            param.email = email;
            param.event = id;
            var query = "INSERT into eventmap set ?";
            connection.query(query,param,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.deductCost = function (email, callback) {
        try{
            var query = "SELECT ecash from users where email=?";
            connection.query(query,[email],function (err, data) {
                if(err){
                    callback(err);
                }
                else{
                    if(data.length>0){
                        var cash = data[0].ecash;
                        cash = parseFloat(cash);
                        cash = cash-1000;
                        var query = "UPDATE users set ecash=? where email=?";
                        connection.query(query,[cash,email],function (err, data) {
                            callback(err,data);
                        });
                    }
                    else{
                        callback({message:"Unknown user"});
                    }

                }
            })
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.query = function (param, callback) {
        try{
            var query = "INSERT into query set ?";
            connection.query(query,param,function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getCash = function (user, callback) {
        var query = "SELECT ecash from users where email=?";
        console.log(user);
        connection.query(query,[user.email],function (err, data) {
            if(err){
                callback(err);
            }
            else{
                console.log(data);
            }
        })
    }

})();