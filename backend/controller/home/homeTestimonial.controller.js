const db = require("../../config/db");

// GET: Fetch only non-deleted testimonials
module.exports.getHomeTestimonials = (req, res) => {
  db.query(
    "SELECT * FROM home_testimonial WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// INSERT: Add new testimonial
module.exports.insertHomeTestimonial = (req, res) => {
  const { description, name } = req.body;

  if (!description || !name) {
    return res.status(400).json({
      error: "Description and name are required",
    });
  }

  const query = `INSERT INTO home_testimonial (description, name) VALUES (?, ?)`;

  db.query(query, [description, name], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json({
      status: "success",
      message: "Testimonial inserted",
      data: results,
    });
  });
};

// UPDATE: Update testimonial by ID
module.exports.updateHomeTestimonial = (req, res) => {
  const { id } = req.params;
  const { description, name } = req.body;

  const query = `UPDATE home_testimonial SET description = ?, name = ? WHERE id = ?`;

  db.query(query, [description, name, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Testimonial updated",
      data: results,
    });
  });
};

// DELETE: Soft delete testimonial (set deleted_at = 1)
module.exports.deleteHomeTestimonial = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE home_testimonial SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Testimonial deleted (soft)",
      data: results,
    });
  });
};

// GET: Fetch only soft-deleted testimonials
module.exports.getTrashedHomeTestimonials = (req, res) => {
  db.query(
    "SELECT * FROM home_testimonial WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// PATCH: Restore soft-deleted testimonial (set deleted_at = 0)
module.exports.restoreHomeTestimonial = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE home_testimonial SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Testimonial restored",
      data: results,
    });
  });
};
