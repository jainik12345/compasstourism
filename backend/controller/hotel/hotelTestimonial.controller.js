const db = require("../../config/db");

// GET all active records
exports.getHotelTestimonial = (req, res) => {
  db.query("SELECT * FROM hotel_testimonial WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelTestimonialByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query(
    "SELECT * FROM hotel_testimonial WHERE hotel_id = ? AND deleted_at = 0",
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
exports.insertHotelTestimonial = (req, res) => {
  const { hotel_id, description, name } = req.body;
  if (!hotel_id || !description || !name) {
    return res.status(400).json({ error: "hotel_id, description and name are required" });
  }

  db.query(
    "INSERT INTO hotel_testimonial (hotel_id, description, name) VALUES (?, ?, ?)",
    [hotel_id, description, name],
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
exports.updateHotelTestimonial = (req, res) => {
  const { id } = req.params;
  const { description, name } = req.body;
  if (!description || !name) return res.status(400).json({ error: "description and name are required" });

  db.query(
    "UPDATE hotel_testimonial SET description = ?, name = ? WHERE id = ? AND deleted_at = 0",
    [description, name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft delete
exports.deleteHotelTestimonial = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_testimonial SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedHotelTestimonial = (req, res) => {
  db.query("SELECT * FROM hotel_testimonial WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelTestimonial = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_testimonial SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};