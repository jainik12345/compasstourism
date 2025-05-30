const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for hotel image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/HotelImages/HotelsNameImage");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("hotel_image");

// Get all hotels (not deleted)
exports.getAllHotels = (req, res) => {
  db.query(
    "SELECT * FROM hotel_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert hotel
exports.insertHotel = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { hotel_city_id, hotel_name, hotel_description, hotel_price } = req.body;
    const hotel_image = req.file?.filename || null;

    if (!hotel_city_id || !hotel_name) {
      return res.status(400).json({ error: "City ID and Hotel Name required" });
    }

    db.query(
      "INSERT INTO hotel_name (hotel_city_id, hotel_name, hotel_description, hotel_price, hotel_image) VALUES (?, ?, ?, ?, ?)",
      [hotel_city_id, hotel_name, hotel_description, hotel_price, hotel_image],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ status: "success", message: "Hotel inserted", insertId: result.insertId });
      }
    );
  });
};

// Update hotel
exports.updateHotel = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      hotel_city_id,
      hotel_name,
      hotel_description,
      hotel_price,
      existingImage,
    } = req.body;

    const hotel_image = req.file ? req.file.filename : existingImage || null;

    if (!hotel_city_id || !hotel_name) {
      return res.status(400).json({ error: "City ID and Hotel Name required" });
    }

    db.query(
      "UPDATE hotel_name SET hotel_city_id = ?, hotel_name = ?, hotel_description = ?, hotel_price = ?, hotel_image = ? WHERE id = ? AND deleted_at = 0",
      [hotel_city_id, hotel_name, hotel_description, hotel_price, hotel_image, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Hotel updated" });
      }
    );
  });
};

// Soft delete hotel
exports.deleteHotel = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Hotel soft deleted" });
    }
  );
};

// Restore soft-deleted hotel
exports.restoreHotel = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Hotel restored" });
    }
  );
};

// Get hotels by city ID
exports.getHotelsByCityId = (req, res) => {
  const { cityId } = req.params;
  db.query(
    "SELECT * FROM hotel_name WHERE hotel_city_id = ? AND deleted_at = 0",
    [cityId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed hotels by city ID
exports.getTrashedHotelsByCityId = (req, res) => {
  const { cityId } = req.params;
  db.query(
    "SELECT * FROM hotel_name WHERE hotel_city_id = ? AND deleted_at = 1",
    [cityId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get hotel by ID
// exports.getHotelById = (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "SELECT * FROM hotel_name WHERE id = ? AND deleted_at = 0",
//     [id],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", data: results });
//     }
//   );
// };
