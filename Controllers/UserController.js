const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.register = async (req, res) => {
  const { StudentID, email, password, Dob } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = new User({
      StudentID,
      email,
      password,
      Dob,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      token,
      user: savedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log('Duplicate key error:', error.message);
      return res.status(400).json({ error: 'Duplicate key error' });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




exports.login = async (req, res) => {
  const { StudentID, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ StudentID: StudentID, password: password });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

   


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
      user: {
        _id: user._id,
        email: user.email,
      },
      token: token, // Include JWT token in the response
    
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




async function sendOTP(email, OTP) {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "i201761@nu.edu.pk",
        pass: "shahbazraza123456",
      },
    });

    const mailOptions = {
      from: "EVLOVE <evlove@example.com>",
      to: email,
      subject: "Login OTP for Your App",
      text: `Your OTP for login is: ${OTP}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
}

// get function
exports.get = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};