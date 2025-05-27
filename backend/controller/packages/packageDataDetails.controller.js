const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/PackageImages/PackageDataDetails"
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
}).fields([
  { name: "single_image", maxCount: 1 },
  { name: "multiple_images", maxCount: 10 },
]);

// Get all active
exports.getPackageData = (req, res) => {
  db.query(
    "SELECT * FROM package_data_details WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get by ID
exports.getPackageDataById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM package_data_details WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// Insert
exports.insertPackageData = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const {
      package_name_id,
      data_title,
      night,
      day,
      data_description,
      inclusions,
      highlight,
      from_city_id,
      to_city_id,
      attraction,
      faqs,
    } = req.body;

    if (!package_name_id || !data_title) {
      return res
        .status(400)
        .json({ error: "package_name_id and data_title are required" });
    }

    const singleImage = req.files["single_image"]?.[0]?.filename;
    const multipleImages =
      req.files["multiple_images"]?.map((file) => file.filename) || [];

    const query = `
      INSERT INTO package_data_details
      (package_name_id, data_title, single_image, night, day, data_description,
       inclusions, highlight , multiple_images, from_city_id, to_city_id, attraction, faqs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?)
    `;

    const values = [
      package_name_id,
      data_title,
      singleImage,
      night || 0,
      day || 0,
      data_description || null,
      inclusions || null,
      highlight || null,
      JSON.stringify(multipleImages),
      from_city_id || null,
      to_city_id || null,
      attraction || null,
      faqs || null,
    ];

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertedId: result.insertId,
      });
    });
  });
};

// Update
exports.updatePackageData = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      package_name_id,
      data_title,
      night,
      day,
      data_description,
      inclusions,
      highlight,
      from_city_id,
      to_city_id,
      attraction,
      faqs,
      existing_single_image,
      existing_multiple_images,
    } = req.body;

    if (!package_name_id || !data_title) {
      return res
        .status(400)
        .json({ error: "package_name_id and data_title are required" });
    }

    const singleImage =
      req.files["single_image"]?.[0]?.filename || existing_single_image;
    let multipleImages = existing_multiple_images
      ? JSON.parse(existing_multiple_images)
      : [];

    if (req.files["multiple_images"]?.length) {
      multipleImages = multipleImages.concat(
        req.files["multiple_images"].map((file) => file.filename)
      );
    }

    const query = `
      UPDATE package_data_details SET
      package_name_id = ?, data_title = ?, single_image = ?, night = ?, day = ?,
      data_description = ?, inclusions = ?, highlight = ?  ,multiple_images = ?, from_city_id = ?,
      to_city_id = ?, attraction = ?, faqs = ?
      WHERE id = ? AND deleted_at = 0
    `;

    const values = [
      package_name_id,
      data_title,
      singleImage,
      night || 0,
      day || 0,
      data_description || null,
      inclusions || null,
      highlight || null,
      JSON.stringify(multipleImages),
      from_city_id || null,
      to_city_id || null,
      attraction || null,
      faqs || null,
      id,
    ];

    db.query(query, values, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    });
  });
};

// Soft delete
exports.deletePackageData = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_data_details SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Get trashed
exports.getTrashedPackageData = (req, res) => {
  db.query(
    "SELECT * FROM package_data_details WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Restore
exports.restorePackageData = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE package_data_details SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get data by package_name_id
exports.getPackageDataByPackageNameId = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM package_data_details WHERE package_name_id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      // Return 200 with empty array if no data found
      res.status(200).json({ status: "success", data: results });
    }
  );
};

exports.getPackageNames = (req, res) => {
  db.query("SELECT id, package_name FROM package_name", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results });
  });
};

exports.getTrashedByPackageId = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM package_data_details WHERE deleted_at = 1 AND package_name_id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
