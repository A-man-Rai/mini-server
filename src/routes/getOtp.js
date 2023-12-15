import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import User from '../models/userSchema.js';
import { setRandomNumber } from './randomNumber.js';
import 'dotenv/config';

function generateRandom5DigitNumber() {
  // Generate a random number between 10000 and 99999
  return Math.floor(Math.random() * 90000) + 10000;
}

const signup = async (req, res) => {
  try {
    // Create a test email account for development
    let testAccount = await nodemailer.createTestAccount();

    // Create a Nodemailer transporter using the test account
    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "jillian.leffler@ethereal.email",
        pass: "BAGxeJt658Y5ttktcy",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    

    // Define the email message
    let message = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Successfully Register with us.",
      html: "<b>Successfully Register with us.</b>",
    };

    // Send the email
    const info = await transporter.sendMail(message);

    // Return a JSON response with information about the sent email
    return res.status(201).json({
      msg: "You should receive a registration confirmation email",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    // Handle errors and return a 500 status code with an error message
    console.error("Error in signup:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};




const getOtp = async (req, res) => {
  const { username, email } = req.body;
  console.log(email);
  console.log(username);

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Is Already Registered" });
    }

    const randomNumber = generateRandom5DigitNumber();
    setRandomNumber(randomNumber);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "arai99981@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "TEAM ACCIDENT MAPPING ",
        link: 'https://mailgen.js/',
      },
    });

    let response = {
      body: {
        name: `${username}`,
        intro: "Use the verification code below to log in",
        table: {
          data: [
            {
              OTP: randomNumber,
            },
          ],
        },
        outro:
          "You received this email because you requested to log in to your Accident Mapping Web App. If you didn't request to log in, you can safely ignore this email.",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: "arai99981@gmail.com",
      to: email,
      subject: "Accident Mapping Login",
      html: mail,
    };

    transporter.sendMail(message)
      .then(() => {
        return res.status(201).json({
          message: "You should receive an email",
        });
      })
      .catch(error => {
        return res.status(500).json({ error });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export { getOtp, signup };
