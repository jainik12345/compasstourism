const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for single image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/HotelImages/HotelFacilities");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }).single("image");

// GET all active
exports.getHotelFacilities = (req, res) => {
  db.query("SELECT * FROM hotel_facilities WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelFacilitiesByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query("SELECT * FROM hotel_facilities WHERE hotel_id = ? AND deleted_at = 0", [hotel_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ status: "success", data: results });
  });
};

// POST insert
exports.insertHotelFacilities = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const { hotel_id, title } = req.body;
    if (!hotel_id) return res.status(400).json({ error: "hotel_id is required" });
    if (!title) return res.status(400).json({ error: "title is required" });
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const imagePath = req.file.filename;
    db.query(
      "INSERT INTO hotel_facilities (hotel_id, image, title) VALUES (?, ?, ?)",
      [hotel_id, imagePath, title],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          status: "success",
          message: "Inserted",
          insertedId: result.insertId,
        });
      }
    );
  });
};

// PUT update
exports.updateHotelFacilities = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const { id } = req.params;
    const { title, existingImage } = req.body;

    let imageToSave = existingImage || null;
    if (req.file) {
      imageToSave = req.file.filename;
    }
    if (!title) return res.status(400).json({ error: "title is required" });
    if (!imageToSave) return res.status(400).json({ error: "No image provided" });

    db.query(
      "UPDATE hotel_facilities SET image = ?, title = ? WHERE id = ? AND deleted_at = 0",
      [imageToSave, title, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteHotelFacilities = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_facilities SET deleted_at = 1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed
exports.getTrashedHotelFacilities = (req, res) => {
  db.query("SELECT * FROM hotel_facilities WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelFacilities = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_facilities SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};