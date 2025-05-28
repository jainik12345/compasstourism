const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/AboutImages/AboutServiceSection");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("image");

// GET all active
exports.getAboutServiceSection = (req, res) => {
  db.query("SELECT * FROM about_service_section WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by ID
exports.getAboutServiceSectionById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM about_service_section WHERE id = ? AND deleted_at = 0", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ status: "success", data: results[0] });
  });
};

// POST insert
exports.insertAboutServiceSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { title, description } = req.body;
    const image = req.file.filename;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    db.query(
      "INSERT INTO about_service_section (title, description, image) VALUES (?, ?, ?)",
      [title, description, image],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ status: "success", message: "Inserted", insertedId: result.insertId });
      }
    );
  });
};

// PUT update
exports.updateAboutServiceSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { title, description, existingImage } = req.body;
    const newImage = req.file?.filename || existingImage;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    db.query(
      "UPDATE about_service_section SET title = ?, description = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [title, description, newImage, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft delete
exports.deleteAboutServiceSection = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE about_service_section SET deleted_at = 1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed
exports.getTrashedAboutServiceSection = (req, res) => {
  db.query("SELECT * FROM about_service_section WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreAboutServiceSection = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE about_service_section SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};
