const db = require("../config/db");

// GET: All non-deleted addresses
exports.getContactAddresses = (req, res) => {
  db.query(
    "SELECT * FROM contact_section_address WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// POST: Insert a new address
exports.insertContactAddress = (req, res) => {
  const { title, address } = req.body;

  if (!title || !address) {
    return res.status(400).json({ error: "Title and address are required" });
  }

  const query = `INSERT INTO contact_section_address (title, address) VALUES (?, ?)`;

  db.query(query, [title, address], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(201)
      .json({ status: "success", message: "Address inserted", data: result });
  });
};

// PUT: Update an address by ID
exports.updateContactAddress = (req, res) => {
  const { id } = req.params;
  const { title, address } = req.body;

  const query = `UPDATE contact_section_address SET title = ?, address = ? WHERE id = ?`;

  db.query(query, [title, address, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(200)
      .json({ status: "success", message: "Address updated", data: result });
  });
};

// DELETE: Soft delete by setting deleted_at = 1
exports.deleteContactAddress = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_section_address SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(200)
      .json({ status: "success", message: "Address deleted", data: result });
  });
};

// GET: Get soft-deleted addresses
exports.getTrashedContactAddresses = (req, res) => {
  db.query(
    "SELECT * FROM contact_section_address WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore deleted address
exports.restoreContactAddress = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE contact_section_address SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(200)
      .json({ status: "success", message: "Address restored", data: result });
  });
};
