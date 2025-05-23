import React from 'react'
import AboutHeroSection from './AboutHeroSection/AboutHeroSection';
import AboutImageSection from './AboutImageSection/AboutImageSection';
import AboutServiceSection from './AboutServiceSection/AboutServiceSection';
import AboutDetailsPage from './AboutDetailsPage/AboutDetailsPage';

const AboutPage = () => {
  return (
    <div>
      <AboutHeroSection />
      <AboutImageSection/>
      <AboutServiceSection />
      <AboutDetailsPage />
    </div>
  )
}

export default AboutPage
