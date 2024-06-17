const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const crypto = require("crypto");
const sendOtpEmail = require("../services/mail.service");

const handleSendOpt = async (req, res) => {
  const { email } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.create({ email, otp, expiresAt });

    sendOtpEmail(email, otp);
    res.status(200).json({ msg: `OTP sent to ${email}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ msg: "Error sending OTP", error: error.message });
  }
};
const handleVerifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteOne({ email, otp });

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ msg: "Error verifying OTP", error: error.message });
  }
};

module.exports = {
  handleSendOpt,
  handleVerifyOtp,
};
