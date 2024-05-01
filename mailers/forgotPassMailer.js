const nodemailer = require('../config/nodemailer');

//function which sends mail
exports.resetPass = (passToken) => {
    console.log('Inside passToken mailer');
    let htmlString = nodemailer.renderTemplate({passToken: passToken}, '/PassToken/pass_token_email.ejs');
    nodemailer.transporter.sendMail({
        from: 'hellotd12@gmail.com',
        to: passToken.user.email,
        subject: 'Reset Password Link',
        html: htmlString,

    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('Delivered->',info);
        return;
    });
}