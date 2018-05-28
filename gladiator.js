(function(){

    var express = require('express');
    var app = express();
    var cors = require('cors');
    var connection = require('./server/configs/connection');
    var bodyParser = require('body-parser');
    var logger = require('morgan');
    var config = require('./server/configs/config.json');
    var port = config.port;

    //---------------------------------Middlewares---------------------------------//

    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.text());

    app.listen(port);
    console.log('Server running on port '+port);
    var routes = require('./server/index')(app);

    process.on('SIGINT',function () {
        console.log('App terminated and DB connection closed');
        process.exit(0);
    });

    module.exports = app;

})();