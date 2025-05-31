const db = require("../../config/db");

// GET all active records
exports.getHotelAbout = (req, res) => {
  db.query("SELECT * FROM hotel_about WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelAboutByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query(
    "SELECT * FROM hotel_about WHERE hotel_id = ? AND deleted_at = 0",
    [hotel_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json({
        status: "success",
        data: results.length > 0 ? results : [],
        message:
          results.length > 0 ? "Data found" : "No data found for this hotel",
      });
    }
  );
};

// POST insert
exports.insertHotelAbout = (req, res) => {
  const { hotel_id, about } = req.body;
  if (!hotel_id || !about) {
    return res.status(400).json({ error: "hotel_id and about are required" });
  }

  db.query(
    "INSERT INTO hotel_about (hotel_id, about) VALUES (?, ?)",
    [hotel_id, about],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertedId: result.insertId,
      });
    }
  );
};

// PUT update
exports.updateHotelAbout = (req, res) => {
  const { id } = req.params;
  const { about } = req.body;
  if (!about) return res.status(400).json({ error: "about is required" });

  db.query(
    "UPDATE hotel_about SET about = ? WHERE id = ? AND deleted_at = 0",
    [about, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft delete
exports.deleteHotelAbout = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_about SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedHotelAbout = (req, res) => {
  db.query("SELECT * FROM hotel_about WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelAbout = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_about SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};
