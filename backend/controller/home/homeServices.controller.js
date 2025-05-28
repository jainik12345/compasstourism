const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for multiple image uploads (max 5)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/HomeImages/HomeServices");
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
  limits: { files: 5, fileSize: 10 * 1024 * 1024 }, // 10MB each
}).array("images", 5);

// GET
exports.getHomeServices = (req, res) => {
  db.query("SELECT * FROM home_services LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ status: "success", data: results[0] || null });
  });
};

// POST or PUT (Upsert-style)
// exports.saveHomeServices = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) return res.status(500).json({ error: err.message });

//     const { heading, description } = req.body;
//     if (!heading || !description) {
//       return res.status(400).json({ error: "Heading and description are required" });
//     }

//     const images = req.files.map((file) => file.filename);
//     const imagesJSON = JSON.stringify(images);

//     db.query("SELECT id FROM home_services LIMIT 1", (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });

//       if (results.length > 0) {
//         const id = results[0].id;
//         db.query(
//           "UPDATE home_services SET heading = ?, description = ?, images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
//           [heading, description, imagesJSON, id],
//           (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.status(200).json({ status: "success", message: "Updated successfully" });
//           }
//         );
//       } else {
//         db.query(
//           "INSERT INTO home_services (heading, description, images) VALUES (?, ?, ?)",
//           [heading, description, imagesJSON],
//           (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.status(201).json({ status: "success", message: "Inserted successfully" });
//           }
//         );
//       }
//     });
//   });
// };

exports.saveHomeServices = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { heading, description } = req.body;
    if (!heading || !description) {
      return res
        .status(400)
        .json({ error: "Heading and description are required" });
    }

    // Merge existing + new images
    let existingImages = [];
    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");
    } catch (e) {
      existingImages = [];
    }
    const newImages = req.files.map((file) => file.filename);
    const allImages = [...existingImages, ...newImages];
    const imagesJSON = JSON.stringify(allImages);

    // Upsert logic
    db.query("SELECT id FROM home_services LIMIT 1", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        const id = results[0].id;
        db.query(
          "UPDATE home_services SET heading = ?, description = ?, images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
          [heading, description, imagesJSON, id],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res
              .status(200)
              .json({ status: "success", message: "Updated successfully" });
          }
        );
      } else {
        db.query(
          "INSERT INTO home_services (heading, description, images) VALUES (?, ?, ?)",
          [heading, description, imagesJSON],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res
              .status(201)
              .json({ status: "success", message: "Inserted successfully" });
          }
        );
      }
    });
  });
};
