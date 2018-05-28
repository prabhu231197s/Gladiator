(function () {

    var mysql = require('mysql');
    var config = require('./config.json');
    var dbConfig = config.test;

    var connection = mysql.createConnection(dbConfig);

    connection.connect(function (err, data) {
        if(err){
            console.log('DB connection error:'+err.message);
        }
        else{
            console.log('DB connection established');
        }
    });


    module.exports = connection;

})();