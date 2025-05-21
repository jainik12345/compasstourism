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

import React from "react";
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
