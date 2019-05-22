let nodemailer = require('nodemailer');

let serviceName = 'gmail';
let fromEmail = 'your_email@gmail.com';
let fromPassword = 'your_password';

let toEmail = 'to_email@gmail.com';

let emailSubject = 'Email from Node.js';
let emailText = 'Email from Node.js Text text text!!!';

let transporter = nodemailer.createTransport({
    service: serviceName,
    auth: {
        user: fromEmail,
        pass: fromPassword
    }
});

let mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: emailSubject,
    text: emailText
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});