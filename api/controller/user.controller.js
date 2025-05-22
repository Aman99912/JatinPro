import crypto from 'crypto';
import { UserModel } from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const otpStore = {}; 



export const finalizeRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Basic validation
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const code = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const pass = Math.floor(1000 + Math.random() * 9000);

    const generateUsername = (baseName) => {
      const base = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const suffix = crypto.randomBytes(2).toString('hex'); // 4 hex chars
      return `${base}${suffix}`;
    };

    let baseName = fullname || email.split('@')[0];
    let username = generateUsername(baseName);
    while (await UserModel.findOne({ username })) {
      username = generateUsername(baseName);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    
    });

    // Setup nodemailer transporter (use environment variables!)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Welcome to Our Service!",
      text: `Hello ${fullname},\n\nThank you for signing up!\n\nYour login details:\nUsername: ${username}\nTemporary Passcode: ${pass}\n\nPlease keep your credentials safe.\n\nBest regards,\nThe Team`,
    };

    // Send welcome email
    await transporter.sendMail(mailOptions);

    // Respond success
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      username,
    });

  } catch (error) {
    console.error("Error in finalizeRegister:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const GetUserByEmail = async (req, res) => {
  const { email } = req.params;
  
  try {
    // Find the user in the database and return only the 'code' field
    const user = await UserModel.findOne(email); // Specify 'code' field
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    
    return res.json({ success: true, username: user.username,email: user.email}); 
  } catch (err) {
    console.error('Error during fetching user:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore[email] = { otp, expiresAt };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "OTP sending failed", error: error.message });
  }
};


// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({ message: "No OTP found for this email." });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  if (Date.now() > storedOtp.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired." });
  }

  res.status(200).json({ message: "OTP verified successfully." });
};

// 🔐 Login (email, mobile or username + password)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};




// 🚪 Logout
export const logoutUser = async (req, res) => {
  try {
   res.clearCookie("token");
res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// 🔍 Search user by code
export const getUserByCode = async (req, res) => {
  const { code } = req.query;  // Correct way to access query parameter
  
  try {
    const user = await UserModel.findOne({code}); // Fetch user by code (adjust fields as needed)
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, username: user.username });  // Sending back user details
  } catch (err) {
    console.error('Error during fetching user:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

