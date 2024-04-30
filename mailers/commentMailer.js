const nodemailer = require('../config/nodemailer');

//function which sends mail
exports.newComment = (comment) => {
    console.log('Inside comment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'hellotd12@gmail.com',
        to: comment.user.email,
        subject: 'New Comment',
        html: htmlString,

    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('Delivered->',info);
        return;
    })
}