const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../Images/OurAssociations");
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

// GET active (only one row with deleted_at=0)
exports.getOurAssociations = (req, res) => {
  db.query(
    "SELECT * FROM our_associations WHERE deleted_at = 0 LIMIT 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "No active record found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert or update (only one row in table)
exports.insertOrUpdateOurAssociations = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.files || !req.files.length)
      return res.status(400).json({ error: "No images uploaded" });

    const imagePaths = req.files.map((file) => file.filename);

    // Check if row exists
    db.query(
      "SELECT id, images FROM our_associations LIMIT 1",
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
          // Insert new row
          db.query(
            "INSERT INTO our_associations (id, images, deleted_at) VALUES (?, ?, 0)",
            [1, JSON.stringify(imagePaths)],
            (err, result) => {
              if (err) return res.status(500).json({ error: err.message });
              res.status(201).json({
                status: "success",
                message: "Inserted",
                insertedId: result.insertId,
              });
            }
          );
        } else {
          let existingImages = [];
          try {
            existingImages = JSON.parse(results[0].images);
          } catch {
            existingImages = [];
          }
          const allImages = [...existingImages, ...imagePaths];

          db.query(
            "UPDATE our_associations SET images = ?, deleted_at = 0 WHERE id = ?",
            [JSON.stringify(allImages), results[0].id],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.status(200).json({ status: "success", message: "Updated" });
            }
          );
        }
      }
    );
  });
};

// DELETE soft (set deleted_at=1)
exports.deleteOurAssociations = (req, res) => {
  // Since only one row, soft delete id=1
  db.query("UPDATE our_associations SET deleted_at = 1 WHERE id = 1", (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed (deleted_at=1)
exports.getTrashedOurAssociations = (req, res) => {
  db.query(
    "SELECT * FROM our_associations WHERE deleted_at = 1 LIMIT 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "No trashed record found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// PATCH restore (deleted_at=0)
exports.restoreOurAssociations = (req, res) => {
  db.query("UPDATE our_associations SET deleted_at = 0 WHERE id = 1", (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};

// PUT update handler
exports.updateOurAssociations = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Parse existingImages from form-data string
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch {
        return res.status(400).json({ error: "Invalid existingImages format" });
      }
    }

    // Get new uploaded images filenames
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Merge images (keep existing + new)
    const updatedImages = [...existingImages, ...newImages];

    // Get current DB images to check which files to delete (those removed by user)
    db.query(
      "SELECT images FROM our_associations WHERE id = 1",
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        let oldImages = [];
        if (results.length > 0) {
          try {
            oldImages = JSON.parse(results[0].images);
          } catch {
            oldImages = [];
          }
        }

        // Find deleted images (present in oldImages but NOT in updatedImages)
        const deletedImages = oldImages.filter(
          (img) => !updatedImages.includes(img)
        );

        // Delete removed images from disk
        const imageDir = path.join(__dirname, "../Images/OurAssociations");
        deletedImages.forEach((filename) => {
          const filePath = path.join(imageDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
              if (err) console.error("Failed to delete file:", filePath, err);
            });
          }
        });

        // Update DB with new images list
        db.query(
          "UPDATE our_associations SET images = ? WHERE id = 1",
          [JSON.stringify(updatedImages)],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res
              .status(200)
              .json({ status: "success", message: "Updated successfully" });
          }
        );
      }
    );
  });
};
