const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/PackageImages/PackageNameImages"
    );
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, "package_name_" + uniqueName);
  },
});
const upload = multer({ storage }).single("image");

// Get all package names
exports.getAllPackages = (req, res) => {
  db.query(
    "SELECT * FROM package_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new package
exports.insertPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { package_country_id, package_name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!package_country_id || !package_name) {
      return res.status(400).json({
        error: "Package country ID and package name are required",
      });
    }

    db.query(
      "INSERT INTO package_name (package_country_id, package_name, image) VALUES (?, ?, ?)",
      [package_country_id, package_name, image],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          status: "success",
          message: "Package inserted",
          insertId: result.insertId,
        });
      }
    );
  });
};

// Update package
exports.updatePackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { package_country_id, package_name, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    const updateFields = [];
    const values = [];

    if (package_country_id) {
      updateFields.push("package_country_id = ?");
      values.push(package_country_id);
    }

    if (package_name) {
      updateFields.push("package_name = ?");
      values.push(package_name);
    }

    if (image) {
      updateFields.push("image = ?");
      values.push(image);
    }

    values.push(id);

    db.query(
      `UPDATE package_name SET ${updateFields.join(
        ", "
      )} WHERE id = ? AND deleted_at = 0`,
      values,
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Package updated" });
      }
    );
  });
};

// Soft delete
exports.deletePackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Package soft deleted" });
    }
  );
};

// Restore
exports.restorePackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Package restored" });
    }
  );
};

// Get by country ID
exports.getPackagesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_name WHERE package_country_id = ? AND deleted_at = 0",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by country ID
exports.getTrashedPackagesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_name WHERE package_country_id = ? AND deleted_at = 1",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
