(function () {

    module.exports = function (app) {
        app.use('/action',require('./routes/commonRoutes'));
        app.use('/api/web',require('./routes/userRoutes'));
        app.use('/api/compile',require('./routes/compilerRoutes'));
        app.use('/admin',require('./routes/adminRoutes'));
    };

})();