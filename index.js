
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors')
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');


app.use(cors())
app.use(express.json())
require('dotenv').config()

const auth = {
    auth: {
        api_key: `${process.env.api}`,
        domain: `${process.env.domain}`
    }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));


app.get('/', (req, res) => {
    res.send('Welcome to Petuk Ji Server')
})

app.post('/contact-form', (req, res) => {
    const formData = req.body;
    nodemailerMailgun.sendMail({
        from: 'customer.care@petukji.in',
        to: formData.email, // An array if you have multiple recipients.
        subject: 'Petuk Ji Support',
        html: `Hi ${formData.name}, We collect your feedback. Stay tuned with us we will contact as soon as possible 
        <br>
        <br>
        Support <br>
        Petuk Ji Team
        `
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.send(err.status)
        }
        else {
            console.log(info);
            res.send(formData)
        }
    });
    console.log(formData.email)
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})