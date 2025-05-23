import React from "react";
import HomeHeroSection from "./HomeHeroSection/HomeHeroSection";
import HomeOffbeatHolidays from "./HomeOffbeatHolidays/HomeOffbeatHolidays";
import HomeWeekendGateways from "./HomeWeekendGateways/HomeWeekendGateways";
import HomeSpiritualTours from "./HomeSpiritualTours/HomeSpiritualTours";
import HomeFestivalTours from "./HomeFestivalTours/HomeFestivalTours";
import HomeIndianHolidays from "./HomeIndianHolidays/HomeIndianHolidays";
import HomeServices from "./HomeServices/HomeServices";
import HomeTestimonial from "./HomeTestimonial/HomeTestimonial";
import HomeBlogs from "./HomeBlogs/HomeBlogs";
import HomeBestHotelDeals from "./HomeBestHotelDeals/HomeBestHotelDeals";
import HomeImages from "./HomeImages/HomeImages";
import HomeCompassSpotlight from "./HomeCompassSpotlight/HomeCompassSpotlight";

const HomePage = () => {
  return (
    <div>

      <HomeHeroSection />
      <HomeOffbeatHolidays />
      <HomeWeekendGateways />
      <HomeSpiritualTours />
      <HomeFestivalTours />
      <HomeIndianHolidays />
      <HomeCompassSpotlight />
      <HomeImages />
      <HomeServices />
      <HomeBestHotelDeals />
      <HomeTestimonial />
      <HomeBlogs />

    </div>
  );
};

export default HomePage;
