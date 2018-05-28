(function () {

    var mailer = require('../configs/mailConfig');

    module.exports.sendVerificationLink = function (email, link, callback) {

        var mail = {
            "from" : "Chintokan India",
            "to" : email,
            "subject" : "Account Verification",
            "text" : "Verify your account by clicking on the following link... "+link
        };

        mailer.sendMail(mail,function (err, data) {
            callback(err,data);
        });

    };

    module.exports.sendReply = function (email, text, callback) {

        var mail = {
            "from" : "Chintokan India",
            "to" : email,
            "subject" : "Reply to query",
            "text" : text
        };

        mailer.sendMail(mail,function (err, data) {
            callback(err,data);
        });

    }

})();