const nodemailer = require('nodemailer');
const { JoinUs, validate } = require('../model/joinus');

let user = process.env.SMTP_USER;
if (!user) {
    console.log('Missing SMTP_USER env var');
    process.exit(1);
}
let pass = process.env.SMTP_PASSWORD;
if (!pass) {
    console.log('Missing SMTP_PASSWORD env var');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
});

var email = {
    send: function (req, res, next) {
        const { name, email } = req.body;
        let subject = "Subscription Success!"
        let html = "<h3 style='color:blue; text-align:center;'>Congraturlation!! Operation success. Thank you for registering with us!</h3><p style='color:gray; text-align:center;'> From now on you will recive all email notifications from us. Thank you. </p>";

        var mailOptions = {
            from: 'Tariq bin Sadiq <' + user + '>',
            to: email,
            subject,
            html,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Email sending Failed", error);
            } else {
                console.log(info);                
            }
        });
        next();
    },
    store: function (req, res, next) {
        const { name, email } = req.body;
        // Store into database
        JoinUs.findOne({ 'email': email }, function (err, obj) {
            if (!err) {
                if (!obj) {
                    let joinUs = new JoinUs({ name, email });
                    joinUs.save(function (newErr, newObj) {
                        if (!newErr) {
                            console.log(newObj);
                        }
                    });
                }
            }
        })
        next();
    }
};

module.exports = email;