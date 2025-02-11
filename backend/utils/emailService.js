const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const msg = {
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text,
        trackingSettings: {
            clickTracking: {
                enable: false, 
            },
        },
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.response?.body || error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendEmail };