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
/*---------------------------------------------------Home Section--------------------------------------------------- */

const homeImageSlider = require("./routes/home/homeImageSlider");
const homeTestimonial = require("./routes/home/homeTestimonial");
const homeBlog = require("./routes/home/homeBlog");
const homeCertificate = require("./routes/home/homeCertificate");
const homeMultipleImages = require("./routes/home/homeMultipleImages");
const homeServices = require("./routes/home/homeServices");
/*---------------------------------------------------About Section--------------------------------------------------- */

const aboutHeroSection = require("./routes/about/aboutHeroSection");
const aboutImageSection = require("./routes/about/aboutImageSection");
const aboutConsultation = require("./routes/about/aboutConsultation");
const aboutServiceSection = require("./routes/about/aboutServiceSection");
const contatForm = require("./routes/contactFormDetails");
const inquire = require("./routes/Inquire");
const contactSectionAddress = require("./routes/ContactSectionAddress");
const privatePolicy = require("./routes/privatePolicy");
const termsConditions = require("./routes/termsConditions");
const ourAssociations = require("./routes/ourAssociations");
/*---------------------------------------------------Package Section--------------------------------------------------- */

const packageCountry = require("./routes/packages/packageCountry");
const packageStateName = require("./routes/packages/packageStateName");
const packageAreaName = require("./routes/packages/packageAreaName");
const packageName = require("./routes/packages/packageName");
const packageDataDetails = require("./routes/packages/packageDataDetails");
const packageDataAreaName = require("./routes/packages/packageDataAreaName");
/*---------------------------------------------------Hotels Section--------------------------------------------------- */

const hotelCityName = require("./routes/hotel/hotelCityName")
const hotelName = require("./routes/hotel/hotelName");


app.use("/admin", admin);
/*---------------------------------------------------Home Section--------------------------------------------------- */

app.use("/homeImageSlider", homeImageSlider);
app.use("/homeTestimonial", homeTestimonial);
app.use("/homeBlog", homeBlog);
app.use("/homeCertificate", homeCertificate);
app.use("/homeMultipleImages", homeMultipleImages);
app.use("/homeServices", homeServices);
/*---------------------------------------------------About Section--------------------------------------------------- */

app.use("/aboutHeroSection", aboutHeroSection);
app.use("/aboutImageSection", aboutImageSection);
app.use("/aboutConsultation", aboutConsultation);
app.use("/aboutServiceSection", aboutServiceSection);
app.use("/private-policy", privatePolicy);
app.use("/termsConditions", termsConditions);
app.use("/contact-form", contatForm);
app.use("/inquire", inquire);
app.use("/contact-section-address", contactSectionAddress);
app.use("/ourAssociations", ourAssociations);
/*---------------------------------------------------Package Section--------------------------------------------------- */

app.use("/packageCountry", packageCountry);
app.use("/packageStateName", packageStateName);
app.use("/packageAreaName", packageAreaName);
app.use("/packageName", packageName);
app.use("/packageDataDetails", packageDataDetails);
app.use("/packageDataAreaName", packageDataAreaName);
/*---------------------------------------------------Hotels Section--------------------------------------------------- */

app.use("/hotelCityName", hotelCityName)
app.use("/hotelName", hotelName);

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
  "/Images/HomeImages/HomeMultipleImages",
  express.static(path.join(__dirname, "Images/HomeImages/HomeMultipleImages"))
);

app.use(
  "/Images/HomeImages/HomeServices",
  express.static(path.join(__dirname, "Images/HomeImages/HomeServices"))
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
  "/Images/AboutImages/AboutServiceSection",
  express.static(path.join(__dirname, "Images/AboutImages/AboutServiceSection"))
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

app.use(
  "/Images/PackageImages/PackageStateImages",
  express.static(
    path.join(__dirname, "Images/PackageImages/PackageStateImages")
  )
);

app.use(
  "/Images/PackageImages/PackageNameImages",
  express.static(path.join(__dirname, "Images/PackageImages/PackageNameImages"))
);

/**-------------- */

app.use(
  "/Images/HotelImages/HotelsNameImage",
  express.static(path.join(__dirname, "Images/HotelImages/HotelsNameImage"))
);

/**---------------Start Server ---------------*/
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server Running On Port: ${port}`);
// });
