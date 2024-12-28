import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import FeaturedProducts from './FeaturedProducts';
import InfoSection from '../Components/InfoSection';
import ContactForm from '../Components/ContactForm';
const Home = () => {
  return (
    <div>
      <Navbar />
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
