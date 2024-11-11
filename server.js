const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = 3000;

// Your Twilio credentials
const accountSid = 'AC6fa97b7019dd111118f934795dd4cb10';  // Replace with your Account SID
const authToken = 'c55a099929fdf467aa872546f8df233c';    // Replace with your Auth Token
const fromWhatsApp = 'whatsapp:+14155238886'; // Twilio WhatsApp-enabled number
const toWhatsApp = 'whatsapp:+916385297091'; // Your WhatsApp number

// Twilio client
const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body; // Assuming the form has fields 'name', 'email', and 'message'

  // Construct the message content
  const messageContent = `
    New Form Submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

  // Send WhatsApp message via Twilio
  client.messages
    .create({
      body: messageContent,
      from: fromWhatsApp,
      to: toWhatsApp
    })
    .then((message) => {
      res.status(200).json({ success: true, messageSid: message.sid });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
