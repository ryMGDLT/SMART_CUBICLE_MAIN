const sgMail = require('@sendgrid/mail');


require('dotenv').config();

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    console.error('Invalid SendGrid API Key. Please check your .env file.');
    process.exit(1); 
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'recipient@example.com', 
    from: process.env.FROM_EMAIL,
    subject: 'Test Email',
    text: 'This is a test email sent using SendGrid.',
};

sgMail.send(msg)
    .then(() => console.log('Test email sent successfully!'))
    .catch((error) => console.error('Error sending test email:', error.response?.body || error.message));