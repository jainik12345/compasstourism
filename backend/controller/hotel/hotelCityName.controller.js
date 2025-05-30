const db = require("../../config/db");

// GET: Fetch non-deleted records
module.exports.getHotelCities = (req, res) => {
  db.query(
    "SELECT * FROM hotel_city_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// INSERT: Add new city
module.exports.insertHotelCity = (req, res) => {
  const { city_name } = req.body;

  if (!city_name) {
    return res.status(400).json({ error: "City name is required" });
  }

  const query = `INSERT INTO hotel_city_name (city_name) VALUES (?)`;

  db.query(query, [city_name], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({
      status: "success",
      message: "City inserted",
      data: results,
    });
  });
};

// UPDATE: Update city by ID
module.exports.updateHotelCity = (req, res) => {
  const { id } = req.params;
  const { city_name } = req.body;

  if (!city_name) {
    return res.status(400).json({ error: "City name is required" });
  }

  const query = `UPDATE hotel_city_name SET city_name = ? WHERE id = ?`;

  db.query(query, [city_name, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "City updated",
      data: results,
    });
  });
};

// DELETE: Soft delete (set deleted_at = 1)
module.exports.deleteHotelCity = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE hotel_city_name SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "City soft-deleted",
      data: results,
    });
  });
};

// GET: Fetch soft-deleted records
module.exports.getTrashedHotelCities = (req, res) => {
  db.query(
    "SELECT * FROM hotel_city_name WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore soft-deleted record
module.exports.restoreHotelCity = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE hotel_city_name SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "City restored",
      data: results,
    });
  });
};
