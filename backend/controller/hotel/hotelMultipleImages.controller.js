const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/HotelImages/HotelMultipleImages");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }).array("images", 10);

// GET all active
exports.getHotelMultipleImages = (req, res) => {
  db.query("SELECT * FROM hotel_multiple_images WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelMultipleImagesByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query("SELECT * FROM hotel_multiple_images WHERE hotel_id = ? AND deleted_at = 0", [hotel_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ status: "success", data: results });
  });
};

// POST insert
exports.insertHotelMultipleImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const { hotel_id } = req.body;
    if (!hotel_id) return res.status(400).json({ error: "hotel_id is required" });
    if (!req.files || !req.files.length) return res.status(400).json({ error: "No images uploaded" });

    const imagePaths = req.files.map(file => file.filename);
    db.query(
      "INSERT INTO hotel_multiple_images (hotel_id, images) VALUES (?, ?)",
      [hotel_id, JSON.stringify(imagePaths)],
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
exports.updateHotelMultipleImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const { id } = req.params;
    const { existingImages } = req.body;

    let existing = [];
    try {
      existing = JSON.parse(existingImages || "[]");
    } catch {
      return res.status(400).json({ error: "Invalid existingImages format" });
    }

    const uploaded = req.files?.map(file => file.filename) || [];
    const allImages = [...existing, ...uploaded];

    if (!allImages.length) return res.status(400).json({ error: "No images provided" });

    db.query(
      "UPDATE hotel_multiple_images SET images = ? WHERE id = ? AND deleted_at = 0",
      [JSON.stringify(allImages), id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteHotelMultipleImages = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_multiple_images SET deleted_at = 1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed
exports.getTrashedHotelMultipleImages = (req, res) => {
  db.query("SELECT * FROM hotel_multiple_images WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelMultipleImages = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_multiple_images SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};
