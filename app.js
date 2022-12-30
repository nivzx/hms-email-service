const express = require('express')
const nodemailer = require('nodemailer')
var bodyParser = require('body-parser')

const app = express();
const port = 4444

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.post('/send-emails', (req, res)=>{
  const emailAddresses = req.body.emailAddresses;

  const toMails = emailAddresses.join(', ')

  const transporter = nodemailer.createTransport({
    service:'hotmail',
    auth:{
      user:'smartcarehms.messages@outlook.com',
      pass:'m%Ix*LX82^2z',
    },
    tls: {rejectUnauthorized: false}
  })

  const mailOptions = {
    from:'smartcarehms.messages@outlook.com',
    to:toMails,
    subject: 'Looking For Blood Donors',
    text: `
      Hello user!
      The blood bank of SmartCare Hospitals is running short of blood of your type, and is actively looking for donors.
      If you're interested in donating blood, please contact the hospital by contacting (+94)112345678.
      Thank You!
    `
  }

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
      console.log(err)
    }
    console.log('Emails Sent!')
  })

  res.send('Emails sent successfully');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})