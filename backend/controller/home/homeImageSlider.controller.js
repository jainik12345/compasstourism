const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/HomeImages/HomeImageSlider");
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
exports.getHomeImageSlider = (req, res) => {
  db.query("SELECT * FROM home_image_slider WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by ID
exports.getHomeImageSliderById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM home_image_slider WHERE id = ? AND deleted_at = 0", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ status: "success", data: results[0] });
  });
};

// POST insert
exports.insertHomeImageSlider = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.files || !req.files.length) return res.status(400).json({ error: "No images uploaded" });

    const imagePaths = req.files.map(file => file.filename);
    db.query(
      "INSERT INTO home_image_slider (home_slider_images) VALUES (?)",
      [JSON.stringify(imagePaths)],
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
exports.updateHomeImageSlider = (req, res) => {
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
      "UPDATE home_image_slider SET home_slider_images = ? WHERE id = ? AND deleted_at = 0",
      [JSON.stringify(allImages), id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteHomeImageSlider = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE home_image_slider SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedHomeImageSlider = (req, res) => {
  db.query("SELECT * FROM home_image_slider WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHomeImageSlider = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE home_image_slider SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};
