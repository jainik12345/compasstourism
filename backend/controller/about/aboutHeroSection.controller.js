const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/AboutImages/AboutHeroSection"
    );
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).single("image");

// GET all active
exports.getAllHeroSections = (req, res) => {
  db.query(
    "SELECT * FROM about_hero_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getHeroSectionById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM about_hero_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertHeroSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const { description } = req.body;
    const image = req.file.filename;

    if (!description)
      return res.status(400).json({ error: "Description is required" });

    db.query(
      "INSERT INTO about_hero_section (description, image) VALUES (?, ?)",
      [description, image],
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
exports.updateHeroSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { description, existingImage } = req.body;

    // Use new uploaded file name if available; else existingImage; else null
    const newImage = req.file?.filename || existingImage || null;

    if (!description)
      return res.status(400).json({ error: "Description is required" });

    db.query(
      "UPDATE about_hero_section SET description = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [description, newImage, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteHeroSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_hero_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedHeroSections = (req, res) => {
  db.query(
    "SELECT * FROM about_hero_section WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreHeroSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_hero_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};
