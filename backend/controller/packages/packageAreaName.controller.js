const db = require("../../config/db");

// Get all package areas
module.exports.getAllPackageAreas = (req, res) => {
  db.query(
    "SELECT * FROM package_area_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert new package area
module.exports.insertPackageArea = (req, res) => {
  const { package_state_id, package_area_name } = req.body;
  if (!package_state_id || !package_area_name) {
    return res.status(400).json({
      error: "Package state ID and package area name are required",
    });
  }

  db.query(
    "INSERT INTO package_area_name (package_state_id, package_area_name) VALUES (?, ?)",
    [package_state_id, package_area_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({
        status: "success",
        message: "Package area inserted",
        insertId: result.insertId,
      });
    }
  );
};

// Update package area
module.exports.updatePackageArea = (req, res) => {
  const { id } = req.params;
  const { package_state_id, package_area_name } = req.body;

  db.query(
    "UPDATE package_area_name SET package_state_id = ?, package_area_name = ? WHERE id = ? AND deleted_at = 0",
    [package_state_id, package_area_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({
        status: "success",
        message: "Package area updated",
      });
    }
  );
};

// Soft delete package area
module.exports.deletePackageArea = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_area_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({
        status: "success",
        message: "Package area soft deleted",
      });
    }
  );
};

// Get package areas by state ID
module.exports.getPackageAreasByStateId = (req, res) => {
  const { stateId } = req.params;
  db.query(
    "SELECT * FROM package_area_name WHERE package_state_id = ? AND deleted_at = 0",
    [stateId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed package areas by state ID
module.exports.getTrashedPackageAreasByStateId = (req, res) => {
  const { stateId } = req.params;
  db.query(
    "SELECT * FROM package_area_name WHERE package_state_id = ? AND deleted_at = 1",
    [stateId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// Restore soft-deleted package area
module.exports.restorePackageArea = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_area_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({
        status: "success",
        message: "Package area restored",
      });
    }
  );
};
