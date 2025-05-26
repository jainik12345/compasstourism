const db = require("../../config/db");

// Get all package names
module.exports.getAllPackages = (req, res) => {
  db.query(
    "SELECT * FROM package_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new package name
module.exports.insertPackage = (req, res) => {
  const { package_country_id, package_name } = req.body;
  if (!package_country_id || !package_name) {
    return res.status(400).json({
      error: "Package country ID and package name are required",
    });
  }

  db.query(
    "INSERT INTO package_name (package_country_id, package_name) VALUES (?, ?)",
    [package_country_id, package_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({
        status: "success",
        message: "Package inserted",
        insertId: result.insertId,
      });
    }
  );
};

// Update package
module.exports.updatePackage = (req, res) => {
  const { id } = req.params;
  const { package_country_id, package_name } = req.body;

  db.query(
    "UPDATE package_name SET package_country_id = ?, package_name = ? WHERE id = ? AND deleted_at = 0",
    [package_country_id, package_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package updated" });
    }
  );
};

// Soft delete package
module.exports.deletePackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package soft deleted" });
    }
  );
};

// Get all packages by country ID
module.exports.getPackagesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_name WHERE package_country_id = ? AND deleted_at = 0",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed packages by country ID
module.exports.getTrashedPackagesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_name WHERE package_country_id = ? AND deleted_at = 1",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Restore soft deleted package
module.exports.restorePackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package restored" });
    }
  );
};
