const db = require("../config/db");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

module.exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE admin_email_id = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, results[0].admin_password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      admin: {
        id: results[0].id,
        email: results[0].admin_email_id,
      },
    });
  });
};

module.exports.getadmin = (req, res) => {
  db.query("SELECT * FROM admin", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({
        status: "sucess",
        data: results,
      });
    }
  });
};

module.exports.postadmin = (req, res) => {
  db.query("SHOW TABLES LIKE 'admin';", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if (results.length === 0) {
        const query = `
      CREATE TABLE IF NOT EXISTS admin (
          id INT AUTO_INCREMENT PRIMARY KEY,
          admin_email_id VARCHAR(255) NOT NULL UNIQUE,
          admin_password VARCHAR(255) NOT NULL,
          admin_otp VARCHAR(6) DEFAULT NULL,
          admin_otp_expires DATETIME DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
        db.query(query);

        console.log("Table created successfully");
      }
      return res.status(200).json({
        status: "sucess",
        data: results,
      });
    }
  });
};

module.exports.sendOtp = (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const sql = `UPDATE admin SET admin_otp = ?, admin_otp_expires = ? WHERE admin_email_id = ?`;
  db.query(sql, [otp, expiresAt, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Renest Hotels Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 OTP for Password Reset - Renest Admin Panel",
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:'Segoe UI',Roboto,sans-serif;color:#333;background-color:#f4f6f8;padding:20px;border-radius:10px;">
          <div style="text-align:center;margin-bottom:30px;">
            <h2 style="color:#1976d2;">Renest Hotels & Resorts</h2>
            <h3 style="color:#333;">Password Reset OTP</h3>
          </div>
          <p>Hi there,</p>
          <p>You recently requested to reset your password for the <b>Renest Admin Panel</b>. Use the OTP below to proceed:</p>
          <div style="background-color:#e3f2fd;padding:15px;text-align:center;border-radius:8px;margin:20px 0;">
            <span style="font-size:28px;font-weight:bold;color:#0d47a1;">${otp}</span>
          </div>
          <p>This OTP is valid for <b>10 minutes</b>. If you didn’t request a password reset, please ignore this email or contact support.</p>
          <br/>
          <p>Regards,</p>
          <p><b>Renest Hotels Admin Team</b></p>
          <hr style="border:none;border-top:1px solid #ccc;margin-top:30px;">
          <p style="font-size:12px;color:#888;text-align:center;">
            This is an automated message. Please do not reply directly to this email.
          </p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Email send error", error: err });
      return res.status(200).json({ message: "OTP sent successfully" });
    });
  });
};

let verifiedResetEmail = "";

module.exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const sql = "SELECT * FROM admin WHERE admin_email_id = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = results[0];
    const storedOtp = admin.admin_otp;
    const otpExpires = admin.admin_otp_expires;

    if (storedOtp === otp) {
      if (new Date() > new Date(otpExpires)) {
        return res.status(400).json({ message: "OTP has expired." });
      }

      verifiedResetEmail = email;
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP." });
    }
  });
};

module.exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  if (!verifiedResetEmail || !newPassword) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sql = "UPDATE admin SET admin_password = ? WHERE admin_email_id = ?";
    db.query(sql, [hashedPassword, verifiedResetEmail], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      verifiedResetEmail = "";

      return res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Encryption error" });
  }
};
