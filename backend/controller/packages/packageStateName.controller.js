const db = require("../../config/db");

// Get all package states
module.exports.getAllPackageStates = (req, res) => {
  db.query(
    "SELECT * FROM package_state_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new package state
module.exports.insertPackageState = (req, res) => {
  const { package_country_id, package_state_name } = req.body;
  if (!package_country_id || !package_state_name) {
    return res.status(400).json({
      error: "Package country ID and package state name are required",
    });
  }

  db.query(
    "INSERT INTO package_state_name (package_country_id, package_state_name) VALUES (?, ?)",
    [package_country_id, package_state_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({
        status: "success",
        message: "Package state inserted",
        insertId: result.insertId,
      });
    }
  );
};

// Update package state
module.exports.updatePackageState = (req, res) => {
  const { id } = req.params;
  const { package_country_id, package_state_name } = req.body;

  db.query(
    "UPDATE package_state_name SET package_country_id = ?, package_state_name = ? WHERE id = ? AND deleted_at = 0",
    [package_country_id, package_state_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package state updated" });
    }
  );
};

// Soft delete package state
module.exports.deletePackageState = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_state_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package state soft deleted" });
    }
  );
};

// Get package states by country ID
module.exports.getPackageStatesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_state_name WHERE package_country_id = ? AND deleted_at = 0",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed package states by country ID
module.exports.getTrashedPackageStatesByCountryId = (req, res) => {
  const { countryId } = req.params;
  db.query(
    "SELECT * FROM package_state_name WHERE package_country_id = ? AND deleted_at = 1",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Restore soft-deleted package state
module.exports.restorePackageState = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_state_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ status: "success", message: "Package state restored" });
    }
  );
};
