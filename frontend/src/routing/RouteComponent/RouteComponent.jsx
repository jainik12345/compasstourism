// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import HomePage from "../../pages/HomePage/HomePage";
// import AboutPage from "../../pages/AboutPage/AboutPage";
// import ContactUsPage from "../../pages/ContactUsPage/ContactUsPage";

// // Layout wrapper function
// const WebsitePage = ({ children }) => {
//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// };

// // Route setup function
// const RouteComponent = () => {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <WebsitePage>
//             <HomePage />
//           </WebsitePage>
//         }
//       />
//       <Route
//         path="/about-us"
//         element={
//           <WebsitePage>
//             <AboutPage />
//           </WebsitePage>
//         }
//       />
//       <Route
//         path="/contact-us"
//         element={
//           <WebsitePage>
//             <ContactUsPage />
//           </WebsitePage>
//         }
//       />
//     </Routes>
//   );
// };

// export default RouteComponent;

import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../../pages/HomePage/HomePage";
import AboutPage from "../../pages/AboutPage/AboutPage";
import ContactUsPage from "../../pages/ContactUsPage/ContactUsPage";
import IndianCityPage from "../../pages/IndianCityPage/IndianCityPage"; // ✅ Import your dynamic page
import PrivatePolicy from "./../../pages/Terms/PrivatePolicy/PrivatePolicy";
import TermsConditions from "./../../pages/Terms/TermsConditions/TermsConditions";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import HomeBlogInnerPage from "../../pages/HomePage/HomeBlogs/HomeBlogInnerPage/HomeBlogInnerPage";
import HomePackagesCardInnerPage from "../../pages/HomePage/HomePackages/HomePackagesCardInnerPage/HomePackagesCardInnerPage";

const WebsitePage = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const RouteComponent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <WebsitePage>
              <HomePage />
            </WebsitePage>
          }
        />
        <Route
          path="/about-us"
          element={
            <WebsitePage>
              <AboutPage />
            </WebsitePage>
          }
        />
        <Route
          path="/contact-us"
          element={
            <WebsitePage>
              <ContactUsPage />
            </WebsitePage>
          }
        />
        {/* ✅ Dynamic route for Indian cities */}
        <Route
          path="/tours/:cityName"
          element={
            <WebsitePage>
              <IndianCityPage />
            </WebsitePage>
          }
        />

        {/* ✅ Dynamic route for blogs */}
        <Route
          path="/blog/:blogSlag"
          element={
            <WebsitePage>
              <HomeBlogInnerPage />
            </WebsitePage>
          }
        />

        {/* ✅ Dynamic route for blogs */}
        <Route
          path="/tour-package/:tourpackageSlag"
          element={
            <WebsitePage>
              <HomePackagesCardInnerPage />
            </WebsitePage>
          }
        />

        <Route
          path="/private-policy"
          element={
            <WebsitePage>
              <PrivatePolicy />
            </WebsitePage>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <WebsitePage>
              <TermsConditions />
            </WebsitePage>
          }
        />
      </Routes>
    </>
  );
};

export default RouteComponent;
