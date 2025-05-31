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
import IndiaDropDownPages from "../../pages/IndiaDropDownPages/IndiaDropDownPages";
import InquiryNowPage from "../../pages/InquiryNowPage/InquiryNowPage";
import GujaratDropDownPage from "../../pages/GujaratDropDownPage/GujaratDropDownPage";
import HotelPage from "../../pages/HotelPage/HotelPage";
import HotelAfterSearchNames from "../../pages/HotelPage/HotelAfterSearchNames/HotelAfterSearchNames";

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

        <Route
          path="/hotel"
          element={
            <WebsitePage>
              <HotelPage />
            </WebsitePage>
          }
        />

        {/* <Route
          path="/hotel/:hotelNameSlag"
          element={
            <WebsitePage>
              <HotelAfterSearchNames />
            </WebsitePage>
          }
        /> */}

        <Route
          path="/hotel/:hotelNameSlag"
          element={
            <WebsitePage>
                <HotelAfterSearchNames />
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

        {/*✅ Dynamic route for Gujarat Packages */}

        <Route
          path="/gujarat-tours/:GujaratPackageName"
          element={
            <WebsitePage>
              <GujaratDropDownPage />
            </WebsitePage>
          }
        />

        {/* ✅ Dynamic route for Indian drop down pages */}
        <Route
          path="/tour/:StateNameSlag"
          element={
            <WebsitePage>
              <IndiaDropDownPages />
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
          path="/inquiry-now/:InquiryNowSlag"
          element={
            <WebsitePage>
              <InquiryNowPage />
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
