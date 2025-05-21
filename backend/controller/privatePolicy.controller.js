const db = require("../config/db");

// GET: Only fetch non-deleted records
module.exports.getprivatePolicy = (req, res) => {
  db.query(
    "SELECT * FROM private_policy WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// INSERT: Add new policy
module.exports.insertPrivatePolicy = (req, res) => {
  const { private_policy_title, private_policy_description } = req.body;

  if (!private_policy_title || !private_policy_description) {
    return res.status(400).json({
      error: "Title and description are required",
    });
  }

  const query = `INSERT INTO private_policy (private_policy_title, private_policy_description) VALUES (?, ?)`;

  db.query(
    query,
    [private_policy_title, private_policy_description],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res
        .status(201)
        .json({ status: "success", message: "Policy inserted", data: results });
    }
  );
};

// UPDATE: Update policy by ID
module.exports.updatePrivatePolicy = (req, res) => {
  const { id } = req.params;
  const { private_policy_title, private_policy_description } = req.body;

  const query = `UPDATE private_policy SET private_policy_title = ?, private_policy_description = ? WHERE id = ?`;

  db.query(
    query,
    [private_policy_title, private_policy_description, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res
        .status(200)
        .json({ status: "success", message: "Policy updated", data: results });
    }
  );
};

// DELETE: Soft delete by setting deleted_at = 1
module.exports.deletePrivatePolicy = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE private_policy SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Policy deleted (soft)",
      data: results,
    });
  });
};
// GET: Fetch only soft-deleted records
module.exports.getTrashedPrivatePolicy = (req, res) => {
  db.query(
    "SELECT * FROM private_policy WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// PATCH: Restore soft-deleted policy
module.exports.restorePrivatePolicy = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE private_policy SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Policy restored",
      data: results,
    });
  });
};
