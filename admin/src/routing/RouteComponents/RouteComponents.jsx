import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./../../components/MainLayout";
import LoginPage from "../../components/LoginSection/LoginPage";
import ForgotPassword from "../../components/LoginSection/ForgotPassword";
import VerifyOTP from "../../components/LoginSection/VerifyOTP";
import ResetPassword from "../../components/LoginSection/ResetPassword";
import HomeBlogs from "../../pages/HomePage/HomeBlogs/HomeBlogs";
import HomeBlogsInsert from "../../pages/HomePage/HomeBlogs/HomeBlogsInsert";
import HomeBlogsUpdate from "../../pages/HomePage/HomeBlogs/HomeBlogsUpdate";
import HomeBlogsTrace from "../../pages/HomePage/HomeBlogs/HomeBlogsTrace";
import HomeTestimonial from "../../pages/HomePage/HomeTestimonial/HomeTestimonial";
import HomeTestimonialInsert from "../../pages/HomePage/HomeTestimonial/HomeTestimonialInsert";
import HomeTestimonialUpdate from "../../pages/HomePage/HomeTestimonial/HomeTestimonialUpdate";
import HomeTestimonialTrace from "../../pages/HomePage/HomeTestimonial/HomeTestimonialTrace";
import AboutHeroSection from './../../pages/AboutPage/AboutHeroSection/AboutHeroSection';
import AboutHeroSectionInsert from './../../pages/AboutPage/AboutHeroSection/AboutHeroSectionInsert';
import AboutHeroSectionUpdate from './../../pages/AboutPage/AboutHeroSection/AboutHeroSectionUpdate';
import AboutHeroSectionTrace from './../../pages/AboutPage/AboutHeroSection/AboutHeroSectionTrace';
import AboutImagesSection from './../../pages/AboutPage/AboutImagesSection/AboutImagesSection';
import AboutImagesSectionInsert from './../../pages/AboutPage/AboutImagesSection/AboutImagesSectionInsert';
import AboutImagesSectionUpdate from './../../pages/AboutPage/AboutImagesSection/AboutImagesSectionUpdate';
import AboutImagesSectionTrace from './../../pages/AboutPage/AboutImagesSection/AboutImagesSectionTrace';
import AboutDetailsSection from './../../pages/AboutPage/AboutDetailsSection/AboutDetailsSection';
import AboutDetailsSectionInsert from './../../pages/AboutPage/AboutDetailsSection/AboutDetailsSectionInsert';
import AboutDetailsSectionUpdate from './../../pages/AboutPage/AboutDetailsSection/AboutDetailsSectionUpdate';
import AboutDetailsSectionTracs from './../../pages/AboutPage/AboutDetailsSection/AboutDetailsSectionTracs';
import ContactFormDetails from './../../pages/ContactPage/ContactFormDetails/ContactFormDetails';
import ContactFormDetailsTrace from './../../pages/ContactPage/ContactFormDetails/ContactFormDetailsTrace';
import ContactSectionAddress from './../../pages/ContactPage/ContactSectionAddress/ContactSectionAddress';
import ContactSectionAddressInsert from './../../pages/ContactPage/ContactSectionAddress/ContactSectionAddressInsert';
import ContactSectionAddressUpdate from './../../pages/ContactPage/ContactSectionAddress/ContactSectionAddressUpdate';
import ContactSectionAddressTrace from './../../pages/ContactPage/ContactSectionAddress/ContactSectionAddressTrace';
import PrivatePolicy from "../../pages/PrivatePolicy/PrivatePolicy";
import PrivatePolicyInsert from './../../pages/PrivatePolicy/PrivatePolicyInsert';
import PrivatePolicyUpdate from './../../pages/PrivatePolicy/PrivatePolicyUpdate';
import PrivatePolicyTrace from './../../pages/PrivatePolicy/PrivatePolicyTrace';
import TermsConditions from './../../pages/TermsConditions/TermsConditions';
import TermsConditionsInsert from './../../pages/TermsConditions/TermsConditionsInsert';
import TermsConditionsUpdate from './../../pages/TermsConditions/TermsConditionsUpdate';
import TermsConditionsTrace from './../../pages/TermsConditions/TermsConditionsTrace';

const RouteComponents = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect / to /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/" element={<MainLayout />}>
          {/* Home Pages */}
          <Route path="/home-blogs" element={<HomeBlogs/>} />
          <Route path="/home-blogs/insert" element={<HomeBlogsInsert/>} />
          <Route path="/home-blogs/update" element={<HomeBlogsUpdate/>} />
          <Route path="/home-blogs/trace" element={<HomeBlogsTrace/>} />

          <Route path="/home-testimonial" element={<HomeTestimonial/>} />
          <Route path="/home-testimonial/insert" element={<HomeTestimonialInsert/>} />
          <Route path="/home-testimonial/update" element={<HomeTestimonialUpdate/>} />
          <Route path="/home-testimonial/trace" element={<HomeTestimonialTrace/>} />

          {/* About Pages */}

          <Route path="/about-hero-section" element={<AboutHeroSection/>} />
          <Route path="/about-hero-section/insert" element={<AboutHeroSectionInsert/>} />
          <Route path="/about-hero-section/update" element={<AboutHeroSectionUpdate/>} />
          <Route path="/about-hero-section/trace" element={<AboutHeroSectionTrace/>} />

          <Route path="/about-images-section" element={<AboutImagesSection/>} />
          <Route path="/about-images-section/insert" element={<AboutImagesSectionInsert/>} />
          <Route path="/about-images-section/update" element={<AboutImagesSectionUpdate/>} />
          <Route path="/about-images-section/trace" element={<AboutImagesSectionTrace/>} />

          <Route path="/about-details-section" element={<AboutDetailsSection/>} />
          <Route path="/about-details-section/insert" element={<AboutDetailsSectionInsert/>} />
          <Route path="/about-details-section/update" element={<AboutDetailsSectionUpdate/>} />
          <Route path="/about-details-section/trace" element={<AboutDetailsSectionTracs/>} />

          {/* Contact Pages */}

          <Route path="/contact-form-details" element={<ContactFormDetails/>} />
          <Route path="/contact-form-details/trace" element={<ContactFormDetailsTrace/>} />


          <Route path="/contact-section-address" element={<ContactSectionAddress/>} />
          <Route path="/contact-section-address/insert" element={<ContactSectionAddressInsert/>} />
          <Route path="/contact-section-address/update" element={<ContactSectionAddressUpdate/>} />
          <Route path="/contact-section-address/trace" element={<ContactSectionAddressTrace/>} />

          {/* Private Policy */}

          <Route path="/private-policy" element={<PrivatePolicy/>} />
          <Route path="/private-policy/insert" element={<PrivatePolicyInsert/>} />
          <Route path="/private-policy/update" element={<PrivatePolicyUpdate/>} />
          <Route path="/private-policy/trace" element={<PrivatePolicyTrace/>} />

          {/* Terms & Conditions */}

          <Route path="/terms-conditions" element={<TermsConditions/>} />
          <Route path="/terms-conditions/insert" element={<TermsConditionsInsert/>} />
          <Route path="/terms-conditions/update" element={<TermsConditionsUpdate/>} />
          <Route path="/terms-conditions/trace" element={<TermsConditionsTrace/>} />


        </Route>
      </Routes>
    </>
  );
};

export default RouteComponents;
