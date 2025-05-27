const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Create Database Connection  */
const db = require("./config/db");
/**Make Database Connection Avaiable in globally */
global.db = db;
/** */

// Simple Route to Check Server
app.get("/", (req, res) => {
  res.send("Hello Backend 🚀🚀🚀🚀🚀");
});

/**Call Routes.. */

const admin = require("./routes/admin");
const homeImageSlider = require("./routes/home/homeImageSlider");
const homeTestimonial = require("./routes/home/homeTestimonial");
const homeBlog = require("./routes/home/homeBlog");
const homeCertificate = require("./routes/home/homeCertificate");
const aboutHeroSection = require("./routes/about/aboutHeroSection");
const aboutImageSection = require("./routes/about/aboutImageSection");
const contatForm = require("./routes/contactFormDetails");
const contactSectionAddress = require("./routes/ContactSectionAddress");
const privatePolicy = require("./routes/privatePolicy");
const ourAssociations = require("./routes/ourAssociations");
const packageCountry = require("./routes/packages/packageCountry");
const packageStateName = require("./routes/packages/packageStateName");
const packageAreaName = require("./routes/packages/packageAreaName");
const packageName = require("./routes/packages/packageName");
const packageDataDetails = require("./routes/packages/packageDataDetails");
const packageDataAreaName = require("./routes/packages/packageDataAreaName");

app.use("/admin", admin);
app.use("/homeImageSlider", homeImageSlider);
app.use("/homeTestimonial", homeTestimonial);
app.use("/homeBlog", homeBlog);
app.use("/homeCertificate", homeCertificate);
app.use("/aboutHeroSection", aboutHeroSection);
app.use("/aboutImageSection", aboutImageSection);
app.use("/private-policy", privatePolicy);
app.use("/contact-form", contatForm);
app.use("/contact-section-address", contactSectionAddress);
app.use("/ourAssociations", ourAssociations);
app.use("/packageCountry", packageCountry);
app.use("/packageStateName", packageStateName);
app.use("/packageAreaName", packageAreaName);
app.use("/packageName", packageName);
app.use("/packageDataDetails", packageDataDetails);
app.use("/packageDataAreaName", packageDataAreaName);

// Static Images
app.use(
  "/Images/HomeImages/HomeImageSlider",
  express.static(path.join(__dirname, "Images/HomeImages/HomeImageSlider"))
);

app.use(
  "/Images/HomeImages/HomeBlog",
  express.static(path.join(__dirname, "Images/HomeImages/HomeBlog"))
);

app.use(
  "/Images/HomeImages/HomeCertificate",
  express.static(path.join(__dirname, "Images/HomeImages/HomeCertificate"))
);

app.use(
  "/Images/AboutImages/AboutHeroSection",
  express.static(path.join(__dirname, "Images/AboutImages/AboutHeroSection"))
);

app.use(
  "/Images/AboutImages/AboutImageSection",
  express.static(path.join(__dirname, "Images/AboutImages/AboutImageSection"))
);

app.use(
  "/Images/OurAssociations",
  express.static(path.join(__dirname, "Images/OurAssociations"))
);

app.use(
  "/Images/PackageImages/PackageDataDetails",
  express.static(
    path.join(__dirname, "Images/PackageImages/PackageDataDetails")
  )
);

/**---------------Start Server ---------------*/
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server Running On Port: ${port}`);
// });
