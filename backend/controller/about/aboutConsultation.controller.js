const db = require("../../config/db");

// GET - fetch the single row
exports.getAboutConsultation = (req, res) => {
  db.query("SELECT * FROM about_consultation LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const data = results.length > 0 ? results[0] : null;
    res.status(200).json({ status: "success", data });
  });
};

// POST - insert only if no record exists
exports.insertAboutConsultation = (req, res) => {
  const { partners, listed_hotels, destinations, booking } = req.body;

  if (
    partners === undefined ||
    listed_hotels === undefined ||
    destinations === undefined ||
    booking === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("SELECT * FROM about_consultation LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ error: "Record already exists" });
    }

    db.query(
      `INSERT INTO about_consultation 
       (partners, listed_hotels, destinations, booking, created_at, updated_at) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [partners, listed_hotels, destinations, booking],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
          status: "success",
          message: "Inserted successfully",
          insertedId: result.insertId,
        });
      }
    );
  });
};

// PUT - update the single existing record
exports.updateAboutConsultation = (req, res) => {
  const { partners, listed_hotels, destinations, booking } = req.body;

  db.query("SELECT * FROM about_consultation LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "No record found to update" });
    }

    const id = results[0].id;

    db.query(
      `UPDATE about_consultation 
       SET partners = ?, listed_hotels = ?, destinations = ?, booking = ?, updated_at = NOW()
       WHERE id = ?`,
      [partners, listed_hotels, destinations, booking, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({
          status: "success",
          message: "Updated successfully",
        });
      }
    );
  });
};
