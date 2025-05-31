const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for room category details images upload (multiple images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/HotelImages/RoomCategoryDetailsImages"
    );
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).array("images", 10); // up to 10 images

// Get all active records
exports.getAllRoomCategoryDetails = (req, res) => {
  db.query(
    "SELECT * FROM hotel_room_category_name_details WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert room category details
exports.insertRoomCategoryDetails = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const {
      room_category_name_id,
      title,
      number_of_bed,
      number_of_sq_ft,
      view,
      amenities,
      price,
    } = req.body;

    // images and amenities are expected as arrays
    const images = req.files ? req.files.map((f) => f.filename) : [];
    let amenitiesArray;
    try {
      amenitiesArray = Array.isArray(amenities)
        ? amenities
        : amenities
        ? JSON.parse(amenities)
        : [];
    } catch {
      amenitiesArray = [];
    }

    if (!room_category_name_id || !title) {
      return res
        .status(400)
        .json({ error: "Room Category Name ID and Title are required" });
    }

    db.query(
      "INSERT INTO hotel_room_category_name_details (room_category_name_id, title, images, number_of_bed, number_of_sq_ft, view, amenities, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        room_category_name_id,
        title,
        JSON.stringify(images),
        number_of_bed || null,
        number_of_sq_ft || null,
        view || null,
        JSON.stringify(amenitiesArray),
        price || null,
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({
            status: "success",
            message: "Room category details inserted",
            insertId: result.insertId,
          });
      }
    );
  });
};

// Update room category details
exports.updateRoomCategoryDetails = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      room_category_name_id,
      title,
      number_of_bed,
      number_of_sq_ft,
      view,
      amenities,
      price,
      existingImages,
    } = req.body;

    // Combine existingImages and new uploads
    let imagesArr = [];
    if (existingImages) {
      try {
        imagesArr = Array.isArray(existingImages)
          ? existingImages
          : JSON.parse(existingImages);
      } catch {
        imagesArr = [];
      }
    }
    if (req.files && req.files.length) {
      imagesArr = imagesArr.concat(req.files.map((f) => f.filename));
    }

    let amenitiesArray;
    try {
      amenitiesArray = Array.isArray(amenities)
        ? amenities
        : amenities
        ? JSON.parse(amenities)
        : [];
    } catch {
      amenitiesArray = [];
    }

    if (!room_category_name_id || !title) {
      return res
        .status(400)
        .json({ error: "Room Category Name ID and Title are required" });
    }

    db.query(
      "UPDATE hotel_room_category_name_details SET room_category_name_id = ?, title = ?, images = ?, number_of_bed = ?, number_of_sq_ft = ?, view = ?, amenities = ?, price = ? WHERE id = ? AND deleted_at = 0",
      [
        room_category_name_id,
        title,
        JSON.stringify(imagesArr),
        number_of_bed || null,
        number_of_sq_ft || null,
        view || null,
        JSON.stringify(amenitiesArray),
        price || null,
        id,
      ],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(200)
          .json({
            status: "success",
            message: "Room category details updated",
          });
      }
    );
  });
};

// Soft delete room category details
exports.deleteRoomCategoryDetails = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_room_category_name_details SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({
          status: "success",
          message: "Room category details soft deleted",
        });
    }
  );
};

// Restore soft-deleted room category details
exports.restoreRoomCategoryDetails = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE hotel_room_category_name_details SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Room category details restored" });
    }
  );
};

// Get room category details by room_category_name_id
exports.getRoomCategoryDetailsByCategoryId = (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT * FROM hotel_room_category_name_details WHERE room_category_name_id = ? AND deleted_at = 0",
    [categoryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed room category details by room_category_name_id
exports.getTrashedRoomCategoryDetailsByCategoryId = (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT * FROM hotel_room_category_name_details WHERE room_category_name_id = ? AND deleted_at = 1",
    [categoryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
