const db = require("../../config/db");

// GET all active
exports.getHotelRules = (req, res) => {
  db.query("SELECT * FROM hotel_rules WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelRulesByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query(
    "SELECT * FROM hotel_rules WHERE hotel_id = ? AND deleted_at = 0",
    [hotel_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// POST insert
exports.insertHotelRules = (req, res) => {
  const { hotel_id, check_in, check_out, rooms, floors, rules } = req.body;
  if (!hotel_id) return res.status(400).json({ error: "hotel_id is required" });
  if (!check_in) return res.status(400).json({ error: "check_in is required" });
  if (!check_out) return res.status(400).json({ error: "check_out is required" });
  if (rooms == null) return res.status(400).json({ error: "rooms is required" });
  if (floors == null) return res.status(400).json({ error: "floors is required" });
  if (!rules) return res.status(400).json({ error: "rules is required" });

  let rulesJson;
  try {
    rulesJson = typeof rules === "string" ? JSON.parse(rules) : rules;
  } catch {
    return res.status(400).json({ error: "Invalid rules JSON" });
  }

  db.query(
    "INSERT INTO hotel_rules (hotel_id, check_in, check_out, rooms, floors, rules) VALUES (?, ?, ?, ?, ?, ?)",
    [hotel_id, check_in, check_out, rooms, floors, JSON.stringify(rulesJson)],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertedId: result.insertId,
      });
    }
  );
};

// PUT update
exports.updateHotelRules = (req, res) => {
  const { id } = req.params;
  const { check_in, check_out, rooms, floors, rules } = req.body;

  if (!check_in) return res.status(400).json({ error: "check_in is required" });
  if (!check_out) return res.status(400).json({ error: "check_out is required" });
  if (rooms == null) return res.status(400).json({ error: "rooms is required" });
  if (floors == null) return res.status(400).json({ error: "floors is required" });
  if (!rules) return res.status(400).json({ error: "rules is required" });

  let rulesJson;
  try {
    rulesJson = typeof rules === "string" ? JSON.parse(rules) : rules;
  } catch {
    return res.status(400).json({ error: "Invalid rules JSON" });
  }

  db.query(
    "UPDATE hotel_rules SET check_in = ?, check_out = ?, rooms = ?, floors = ?, rules = ? WHERE id = ? AND deleted_at = 0",
    [check_in, check_out, rooms, floors, JSON.stringify(rulesJson), id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft
exports.deleteHotelRules = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_rules SET deleted_at = 1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Soft deleted" });
  });
};

// GET trashed
exports.getTrashedHotelRules = (req, res) => {
  db.query("SELECT * FROM hotel_rules WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelRules = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE hotel_rules SET deleted_at = 0 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", message: "Restored" });
  });
};