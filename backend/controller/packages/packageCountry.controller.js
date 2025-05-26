const db = require("../../config/db");

// GET: Fetch non-deleted records
module.exports.getPackageCountries = (req, res) => {
  db.query(
    "SELECT * FROM package_country WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// INSERT: Add new country
module.exports.insertPackageCountry = (req, res) => {
  const { package_country_name } = req.body;

  if (!package_country_name) {
    return res.status(400).json({ error: "Country name is required" });
  }

  const query = `INSERT INTO package_country (package_country_name) VALUES (?)`;

  db.query(query, [package_country_name], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({
      status: "success",
      message: "Country inserted",
      data: results,
    });
  });
};

// UPDATE: Update country by ID
module.exports.updatePackageCountry = (req, res) => {
  const { id } = req.params;
  const { package_country_name } = req.body;

  if (!package_country_name) {
    return res.status(400).json({ error: "Country name is required" });
  }

  const query = `UPDATE package_country SET package_country_name = ? WHERE id = ?`;

  db.query(query, [package_country_name, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Country updated",
      data: results,
    });
  });
};

// DELETE: Soft delete (set deleted_at = 1)
module.exports.deletePackageCountry = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE package_country SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Country soft-deleted",
      data: results,
    });
  });
};

// GET: Fetch soft-deleted records
module.exports.getTrashedPackageCountries = (req, res) => {
  db.query(
    "SELECT * FROM package_country WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore soft-deleted record
module.exports.restorePackageCountry = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE package_country SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Country restored",
      data: results,
    });
  });
};
