const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

require('dotenv').config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

const emailController = async(req, res) => {

    const {email, name, message} = req.body
    console.log(req.body)

  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL_ID,
        pass: process.env.ADMIN_APP_PASSWORD
      }
    });
  
    const emailTemplate = `
    <html>
    <body>
    <h4>From: ${name}</h4>
   
    <p>Email: ${email}</p>
    <p>${message}</p>
    </body>
    </html>
    `
    
    const mailOptions = {
      from:"process.env.ADMIN_EMAIL_ID",
      to: email,
      subject: `New email from ${name}`,
      html: emailTemplate
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
      if(err){
        console.log(err)
      }else{
        res.status(200).json({message: "Email sent"})
      }
    })
  }



app.post('/send-email', emailController);

app.listen(process.env.PORT || 3001, () => console.log('Server Running'));