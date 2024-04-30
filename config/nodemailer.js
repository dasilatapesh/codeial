const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

exports.transporter = nodemailer.createTransport({
    service: 'google',
    host: 'smtp.gmail.com',
    secure: false,
    auth:{
        user: 'hellotd12@gmail.com',
        pass: 'cxuf fwbx akpp tjvf',
    }
});

exports.renderTemplate = (data, relativePath) => { //Relative path is a place from where this functoin will be called 
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log(err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
} 