
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const APP_NAME = 'Easy Alfred';
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email;
    const displayName = user.displayName;
    return sendWelcomeEmail(email, displayName);
});


async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: 'your@easyalfred.com',
    };

    mailOptions.subject = `New ${APP_NAME} user!`;
    mailOptions.text = `Email: ${email}`;
    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);
    return null;
}