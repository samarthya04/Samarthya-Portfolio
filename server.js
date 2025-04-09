require('dotenv').config(); // Add this line to use .env file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail (enable 2FA)
    }
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'chattree.sam@gmail.com',
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send('Error');
        res.status(200).send('Success');
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Server running on port', process.env.PORT || 3000));