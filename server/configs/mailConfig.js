(function(){
    var nodemailer = require('nodemailer');

    var smtpTransport = nodemailer.createTransport("smtp",{
        service : "Gmail",
        auth : {
            user : "chintokankarateindiaofficial@gmail.com",
            pass : "ChintokanKarate2017"
        }
    });

    module.exports = smtpTransport;
})();