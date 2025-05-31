const db = require("../../config/db");

// GET all active
exports.getHotelFacilitiesDetails = (req, res) => {
  db.query("SELECT * FROM hotel_facilities_details WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelFacilitiesDetailsByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query("SELECT * FROM hotel_facilities_details WHERE hotel_id = ? AND deleted_at = 0", [hotel_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ status: "success", data: results });
  });
};

// POST insert
exports.insertHotelFacilitiesDetails = (req, res) => {
  const { hotel_id, heading, title } = req.body;
  if (!hotel_id) return res.status(400).json({ error: "hotel_id is required" });
  if (!heading) return res.status(400).json({ error: "heading is required" });
  if (!title) return res.status(400).json({ error: "title is required" });

  let titleJson;
  try {
    titleJson = typeof title === "string" ? JSON.parse(title) : title;
  } catch {
    return res.status(400).json({ error: "Invalid title JSON" });
  }

  db.query(
    "INSERT INTO hotel_facilities_details (hotel_id, heading, title) VALUES (?, ?, ?)",
    [hotel_id, heading, JSON.stringify(titleJson)],
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
exports.updateHotelFacilitiesDetails = (req, res) => {
  const { id } = req.params;
  const { heading, title } = req.body;

  if (!heading) return res.status(400).json({ error: "heading is required" });
  if (!title) return res.status(400).json({ error: "title is required" });

  let titleJson;
  try {
    titleJson = typeof title === "string" ? JSON.parse(title) : title;
  } catch {
    return res.status(400).json({ error: "Invalid title JSON" });
  }

  db.query(
    "UPDATE hotel_facilities_details SET heading = ?, title = ? WHERE id = ? AND deleted_at = 0",
    [heading, JSON.stringify(titleJson), id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft
exports.deleteHotelFacilitiesDetails = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_facilities_details SET deleted_at = 1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed
exports.getTrashedHotelFacilitiesDetails = (req, res) => {
  db.query("SELECT * FROM hotel_facilities_details WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelFacilitiesDetails = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_facilities_details SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};