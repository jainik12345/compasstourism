const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/AboutImages/AboutImageSection"
    );
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).array("images", 10);

// GET all active
exports.getAboutImageSection = (req, res) => {
  db.query(
    "SELECT * FROM about_image_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getAboutImageSectionById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM about_image_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertAboutImageSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.files || !req.files.length)
      return res.status(400).json({ error: "No images uploaded" });

    const imagePaths = req.files.map((file) => file.filename);
    const now = new Date();

    db.query(
      "INSERT INTO about_image_section (about_images, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?)",
      [JSON.stringify(imagePaths), now, now, 0],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({
            status: "success",
            message: "Inserted",
            insertedId: result.insertId,
          });
      }
    );
  });
};

// PUT update
exports.updateAboutImageSection = (req, res) => {
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

    const uploaded = req.files?.map((file) => file.filename) || [];
    const allImages = [...existing, ...uploaded];

    if (!allImages.length)
      return res.status(400).json({ error: "No images provided" });

    db.query(
      "UPDATE about_image_section SET about_images = ?, updated_at = ? WHERE id = ? AND deleted_at = 0",
      [JSON.stringify(allImages), new Date(), id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteAboutImageSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_image_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedAboutImageSection = (req, res) => {
  db.query(
    "SELECT * FROM about_image_section WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreAboutImageSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_image_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};
