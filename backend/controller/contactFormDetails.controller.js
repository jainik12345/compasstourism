const db = require("../config/db");
const nodemailer = require("nodemailer");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Get all active (not soft-deleted)
exports.getContactForm = (req, res) => {
  db.query(
    "SELECT * FROM contact_form_details WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert contact form data
// exports.insertContactForm = (req, res) => {
//   const { firstname, lastname, email_id, mobile_number, message } = req.body;

//   if (!firstname || !lastname || !email_id || !mobile_number) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const insertQuery = `
//     INSERT INTO contact_form_details (firstname, lastname, email_id, mobile_number, message)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(insertQuery, [firstname, lastname, email_id, mobile_number, message], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });

//     return res.status(201).json({
//       status: "success",
//       message: "Form submitted successfully",
//       id: result.insertId,
//     });
//   });
// };

exports.insertContactForm = (req, res) => {
  const { firstname, lastname, email_id, mobile_number, message } = req.body;

  if (!firstname || !lastname || !email_id || !mobile_number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertQuery = `
    INSERT INTO contact_form_details (firstname, lastname, email_id, mobile_number, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [firstname, lastname, email_id, mobile_number, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Send email after successful insert
      const mailOptions = {
        from: `"Compass Tourism" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // send to your own company email
        subject: "New Contact Form Submission",
        html: `
        <p><strong>First Name:</strong> ${firstname}</p>
        <p><strong>Last Name:</strong> ${lastname}</p>
        <p><strong>Email:</strong> ${email_id}</p>
        <p><strong>Mobile Number:</strong> ${mobile_number}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      };

      transporter.sendMail(mailOptions, (emailErr, info) => {
        if (emailErr) {
          console.error("Email error:", emailErr.message);
          // Optional: still return success even if email fails
          return res.status(201).json({
            status: "warning",
            message: "Form submitted but email failed",
            id: result.insertId,
          });
        }

        return res.status(201).json({
          status: "success",
          message: "Form submitted and email sent",
          id: result.insertId,
        });
      });
    }
  );
};

// Reply to a contact form
exports.replyToContactForm = async (req, res) => {
  const { toEmail, replyMessage } = req.body;

  if (!toEmail || !replyMessage) {
    return res
      .status(400)
      .json({ error: "toEmail and replyMessage are required" });
  }

  const mailOptions = {
    from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reply from Support Team",
    html: `<p>${replyMessage}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ status: "success", message: "Reply sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Soft delete
exports.deleteContactForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_form_details SET deleted_at = 1 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Soft deleted successfully" });
  });
};

// Restore soft-deleted form
exports.restoreContactForm = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_form_details SET deleted_at = 0 WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Restored successfully" });
  });
};

// Get trashed (soft-deleted) records
exports.getTrashedContactForm = (req, res) => {
  db.query(
    "SELECT * FROM contact_form_details WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};
