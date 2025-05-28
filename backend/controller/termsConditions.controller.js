const db = require("../config/db");

// ✅ GET: Fetch only non-deleted terms
module.exports.gettermsConditions = (req, res) => {
  db.query(
    "SELECT * FROM terms_conditions WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// ✅ POST: Create table if not exists
module.exports.posttermsConditions = (req, res) => {
  db.query("SHOW TABLES LIKE 'terms_conditions';", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      const query = `
        CREATE TABLE IF NOT EXISTS terms_conditions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          terms_conditions_title VARCHAR(255) NOT NULL,
          terms_conditions_rules JSON NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TINYINT(1) DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
      db.query(query);
    }

    return res.status(200).json({
      status: "success",
      message: results.length === 0 ? "Table created" : "Table already exists",
    });
  });
};

// ✅ INSERT: Add new terms
module.exports.insertTermsConditions = (req, res) => {
  const { terms_conditions_title, terms_conditions_rules } = req.body;

  const query = `INSERT INTO terms_conditions (terms_conditions_title, terms_conditions_rules) VALUES (?, ?)`;

  db.query(
    query,
    [terms_conditions_title, JSON.stringify(terms_conditions_rules)],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res
        .status(201)
        .json({ status: "success", message: "Terms inserted", data: results });
    }
  );
};

// ✅ UPDATE: Modify existing terms
module.exports.updateTermsConditions = (req, res) => {
  const { id } = req.params;
  const { terms_conditions_title, terms_conditions_rules } = req.body;

  const query = `UPDATE terms_conditions SET terms_conditions_title = ?, terms_conditions_rules = ? WHERE id = ?`;

  db.query(
    query,
    [terms_conditions_title, JSON.stringify(terms_conditions_rules), id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res
        .status(200)
        .json({ status: "success", message: "Terms updated", data: results });
    }
  );
};

// ✅ DELETE: Soft delete (set deleted_at = 1)
module.exports.deleteTermsConditions = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE terms_conditions SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Terms deleted (soft)",
      data: results,
    });
  });
};

// Get only soft-deleted rows
module.exports.getTrashedTermsConditions = (req, res) => {
  db.query(
    "SELECT * FROM terms_conditions WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};
// Restore soft-deleted row
module.exports.restoreTermsConditions = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE terms_conditions SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Terms restored",
      data: results,
    });
  });
};
