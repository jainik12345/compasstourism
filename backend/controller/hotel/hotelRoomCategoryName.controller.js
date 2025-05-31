const db = require("../../config/db");

// GET all active records
exports.getHotelRoomCategoryName = (req, res) => {
  db.query("SELECT * FROM hotel_room_category_name WHERE deleted_at = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// GET by hotel_id
exports.getHotelRoomCategoryNameByHotelId = (req, res) => {
  const { hotel_id } = req.params;
  db.query(
    "SELECT * FROM hotel_room_category_name WHERE hotel_id = ? AND deleted_at = 0",
    [hotel_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json({
        status: "success",
        data: results.length > 0 ? results : [],
        message:
          results.length > 0 ? "Data found" : "No data found for this hotel",
      });
    }
  );
};

// POST insert
exports.insertHotelRoomCategoryName = (req, res) => {
  const { hotel_id, room_category_name } = req.body;
  if (!hotel_id || !room_category_name) {
    return res.status(400).json({ error: "hotel_id and room_category_name are required" });
  }

  db.query(
    "INSERT INTO hotel_room_category_name (hotel_id, room_category_name) VALUES (?, ?)",
    [hotel_id, room_category_name],
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
exports.updateHotelRoomCategoryName = (req, res) => {
  const { id } = req.params;
  const { room_category_name } = req.body;
  if (!room_category_name) return res.status(400).json({ error: "room_category_name is required" });

  db.query(
    "UPDATE hotel_room_category_name SET room_category_name = ? WHERE id = ? AND deleted_at = 0",
    [room_category_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft delete
exports.deleteHotelRoomCategoryName = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_room_category_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedHotelRoomCategoryName = (req, res) => {
  db.query("SELECT * FROM hotel_room_category_name WHERE deleted_at = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

// PATCH restore
exports.restoreHotelRoomCategoryName = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_room_category_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};