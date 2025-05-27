const db = require("../../config/db");

// Get all mappings (not deleted)
module.exports.getAllMappings = (req, res) => {
  db.query(
    "SELECT * FROM package_data_area_map WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Create new mapping
module.exports.insertMapping = (req, res) => {
  const { package_data_id, area_id } = req.body;
  if (!package_data_id || !area_id) {
    return res.status(400).json({ error: "Both package_data_id and area_id are required" });
  }

  db.query(
    "INSERT INTO package_data_area_map (package_data_id, area_id) VALUES (?, ?)",
    [package_data_id, area_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Mapping created",
        insertId: result.insertId,
      });
    }
  );
};

// Update mapping
module.exports.updateMapping = (req, res) => {
  const { id } = req.params;
  const { package_data_id, area_id } = req.body;

  db.query(
    "UPDATE package_data_area_map SET package_data_id = ?, area_id = ? WHERE id = ? AND deleted_at = 0",
    [package_data_id, area_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Mapping updated" });
    }
  );
};

// Soft delete mapping
module.exports.deleteMapping = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_data_area_map SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Mapping soft-deleted" });
    }
  );
};

// Get mappings by package_data_id
module.exports.getByPackageDataId = (req, res) => {
  const { packageDataId } = req.params;
  db.query(
    "SELECT * FROM package_data_area_map WHERE package_data_id = ? AND deleted_at = 0",
    [packageDataId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed mappings by package_data_id
module.exports.getTrashedByPackageDataId = (req, res) => {
  const { packageDataId } = req.params;
  db.query(
    "SELECT * FROM package_data_area_map WHERE package_data_id = ? AND deleted_at = 1",
    [packageDataId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Restore soft-deleted mapping
module.exports.restoreMapping = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_data_area_map SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Mapping restored" });
    }
  );
};
