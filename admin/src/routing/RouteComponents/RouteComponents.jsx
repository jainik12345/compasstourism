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
import HomeImageSlider from "../../pages/HomePage/HomeImageSlider/HomeImageSlider";
import HomeImageSliderInsert from './../../pages/HomePage/HomeImageSlider/HomeImageSliderInsert';
import HomeImageSliderUpdate from './../../pages/HomePage/HomeImageSlider/HomeImageSliderUpdate';
import HomeImageSliderTrace from './../../pages/HomePage/HomeImageSlider/HomeImageSliderTrace';
import HomePage from "../../pages/HomePage/HomePage";
import HomeCertificate from "../../pages/HomePage/HomeCertificate/HomeCertificate";
import HomeCertificateInsert from "../../pages/HomePage/HomeCertificate/HomeCertificateInsert";
import HomeCertificateUpdate from "../../pages/HomePage/HomeCertificate/HomeCertificateUpdate";
import HomeCertificateTrace from "../../pages/HomePage/HomeCertificate/HomeCertificateTrace";
import OurAssociations from "../../pages/OurAssociations/OurAssociations";
import OurAssociationsInsert from "../../pages/OurAssociations/OurAssociationsInsert";
import OurAssociationsUpdate from "../../pages/OurAssociations/OurAssociationsUpdate";
import OurAssociationsTrace from "../../pages/OurAssociations/OurAssociationsTrace";
import PackageCountry from "../../pages/Packages/PackageCountry/PackageCountry";
import PackageCountryInsert from "../../pages/Packages/PackageCountry/PackageCountryInsert";
import PackageCountryUpdate from './../../pages/Packages/PackageCountry/PackageCountryUpdate';
import PackageCountryTrace from './../../pages/Packages/PackageCountry/PackageCountryTrace';
import PackageName from "../../pages/Packages/PackageName/PackageName";
import PackageNameInsert from './../../pages/Packages/PackageName/PackageNameInsert';
import PackageNameUpdate from './../../pages/Packages/PackageName/PackageNameUpdate';
import PackageNameTrace from './../../pages/Packages/PackageName/PackageNameTrace';
import PackageStateName from "../../pages/Packages/PackageStateName/PackageStateName";
import PackageStateNameUpdate from "../../pages/Packages/PackageStateName/PackageStateNameUpdate";
import PackageStateNameInsert from "../../pages/Packages/PackageStateName/PackageStateNameInsert";
import PackageStateNameTrace from "../../pages/Packages/PackageStateName/PackageStateNameTrace";
import PackageAreaName from "../../pages/Packages/PackageAreaName/PackageAreaName";
import PackageAreaNameInsert from './../../pages/Packages/PackageAreaName/PackageAreaNameInsert';
import PackageAreaNameUpdate from "../../pages/Packages/PackageAreaName/PackageAreaNameUpdate";
import PackageAreaNameTrace from "../../pages/Packages/PackageAreaName/PackageAreaNameTrace";
import PackageDataDetails from "../../pages/Packages/PackageDataDetails/PackageDataDetails";
import PackageDataDetailsInsert from "../../pages/Packages/PackageDataDetails/PackageDataDetailsInsert";
import PackageDataDetailsUpdate from "../../pages/Packages/PackageDataDetails/PackageDataDetailsUpdate";
import PackageDataDetailsTrace from "../../pages/Packages/PackageDataDetails/PackageDataDetailsTrace";
import PackageDataAreaName from "../../pages/Packages/PackageDataAreaName/PackageDataAreaName";
import PackageDataAreaNameInsert from "../../pages/Packages/PackageDataAreaName/PackageDataAreaNameInsert";
import PackageDataAreaNameUpdate from "../../pages/Packages/PackageDataAreaName/PackageDataAreaNameUpdate";
import PackageDataAreaNameTrace from "../../pages/Packages/PackageDataAreaName/PackageDataAreaNameTrace";
import AboutConsultation from "../../pages/AboutPage/AboutConsultation/AboutConsultation";
import HomeServices from "../../pages/HomePage/HomeServices/HomeServices";
import AboutServiceSection from './../../pages/AboutPage/AboutServiceSection/AboutServiceSection';
import AboutServiceSectionInsert from './../../pages/AboutPage/AboutServiceSection/AboutServiceSectionInsert';
import AboutServiceSectionUpdate from './../../pages/AboutPage/AboutServiceSection/AboutServiceSectionUpdate';
import AboutServiceSectionTrace from './../../pages/AboutPage/AboutServiceSection/AboutServiceSectionTrace';
 

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

          <Route path="/home-page" element={<HomePage/>} />
          <Route path="/home-image-slider" element={<HomeImageSlider/>} />
          <Route path="/home-image-slider/insert" element={<HomeImageSliderInsert/>} />
          <Route path="/home-image-slider/update" element={<HomeImageSliderUpdate/>} />
          <Route path="/home-image-slider/trace" element={<HomeImageSliderTrace/>} />

          <Route path="/home-blogs" element={<HomeBlogs/>} />
          <Route path="/home-blogs/insert" element={<HomeBlogsInsert/>} />
          <Route path="/home-blogs/update" element={<HomeBlogsUpdate/>} />
          <Route path="/home-blogs/trace" element={<HomeBlogsTrace/>} />

          <Route path="/home-testimonial" element={<HomeTestimonial/>} />
          <Route path="/home-testimonial/insert" element={<HomeTestimonialInsert/>} />
          <Route path="/home-testimonial/update" element={<HomeTestimonialUpdate/>} />
          <Route path="/home-testimonial/trace" element={<HomeTestimonialTrace/>} />

          <Route path="/home-certificate" element={<HomeCertificate/>} />
          <Route path="/home-certificate/insert" element={<HomeCertificateInsert/>} />
          <Route path="/home-certificate/update" element={<HomeCertificateUpdate/>} />
          <Route path="/home-certificate/trace" element={<HomeCertificateTrace/>} />

          <Route path="/home-services" element={<HomeServices/>} />
 

          {/* About Pages */}

          <Route path="/about-hero-section" element={<AboutHeroSection/>} />
          <Route path="/about-hero-section/insert" element={<AboutHeroSectionInsert/>} />
          <Route path="/about-hero-section/update" element={<AboutHeroSectionUpdate/>} />
          <Route path="/about-hero-section/trace" element={<AboutHeroSectionTrace/>} />

          <Route path="/about-images-section" element={<AboutImagesSection/>} />
          <Route path="/about-images-section/insert" element={<AboutImagesSectionInsert/>} />
          <Route path="/about-images-section/update" element={<AboutImagesSectionUpdate/>} />
          <Route path="/about-images-section/trace" element={<AboutImagesSectionTrace/>} />

          <Route path="/about-consultation" element={<AboutConsultation/>} />

          <Route path="/about-service-section" element={<AboutServiceSection/>} />
          <Route path="/about-service-section/insert" element={<AboutServiceSectionInsert/>} />
          <Route path="/about-service-section/update" element={<AboutServiceSectionUpdate/>} />
          <Route path="/about-service-section/trace" element={<AboutServiceSectionTrace/>} />

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


          {/* Our Associations */}

          <Route path="/our-associations" element={<OurAssociations/>} />
          <Route path="/our-associations/insert" element={<OurAssociationsInsert/>} />
          <Route path="/our-associations/update" element={<OurAssociationsUpdate/>} />
          <Route path="/our-associations/trace" element={<OurAssociationsTrace/>} />


           {/* Packages */}

           <Route path="/package-country" element={<PackageCountry/>} />
           <Route path="/package-country/insert" element={<PackageCountryInsert/>} />
           <Route path="/package-country/update" element={<PackageCountryUpdate/>} />
           <Route path="/package-country/trace" element={<PackageCountryTrace/>} />

           <Route path="/package-name" element={<PackageName/>} />
           <Route path="/package-name/insert" element={<PackageNameInsert/>} />
           <Route path="/package-name/update" element={<PackageNameUpdate/>} />
           <Route path="/package-name/trace" element={<PackageNameTrace/>} />


           <Route path="/package-state-name" element={<PackageStateName/>} />
           <Route path="/package-state-name/insert" element={<PackageStateNameInsert/>} />
           <Route path="/package-state-name/update" element={<PackageStateNameUpdate/>} />
           <Route path="/package-state-name/trace" element={<PackageStateNameTrace/>} />

           <Route path="/package-area-name" element={<PackageAreaName/>} />
           <Route path="/package-area-name/insert" element={<PackageAreaNameInsert/>} />
           <Route path="/package-area-name/update" element={<PackageAreaNameUpdate/>} />
           <Route path="/package-area-name/trace" element={<PackageAreaNameTrace/>} />



           <Route path="/package-data-details" element={<PackageDataDetails/>} />
           <Route path="/package-data-details/insert" element={<PackageDataDetailsInsert/>} />
           <Route path="/package-data-details/update" element={<PackageDataDetailsUpdate/>} />
           <Route path="/package-data-details/trace" element={<PackageDataDetailsTrace/>} />


           <Route path="/package-data-area-name" element={<PackageDataAreaName/>} />
           <Route path="/package-data-area-name/insert" element={<PackageDataAreaNameInsert/>} />
           <Route path="/package-data-area-name/update" element={<PackageDataAreaNameUpdate/>} />
           <Route path="/package-data-area-name/trace" element={<PackageDataAreaNameTrace/>} />

        </Route>
      </Routes>
    </>
  );
};

export default RouteComponents;
