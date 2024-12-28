import React from 'react';
import Hero from '../Components/Hero';
import FeaturedProducts from './FeaturedProducts';
import InfoSection from '../Components/InfoSection';
import ContactForm from '../Components/ContactForm';
const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mt-20">
        <FeaturedProducts />
      </div>
      <InfoSection />
      <ContactForm />
    </div>
  );
};

export default Home;
