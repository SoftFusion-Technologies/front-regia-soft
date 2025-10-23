import React from 'react';
import Hero from '../Components/Hero';
import FeaturedProducts from './FeaturedProducts';
import InfoSection from '../Components/InfoSection';
import ContactForm from '../Components/ContactForm';

// imagenes instagram
import imgInsta1 from '../Images/HeroInsta/imgInsta1.jpg';
import imgInsta2 from '../Images/HeroInsta/imgInsta2.jpg';
import imgInsta3 from '../Images/HeroInsta/imgInsta3.jpg';
import imgInsta4 from '../Images/HeroInsta/imgInsta4.jpg';
import imgInsta5 from '../Images/HeroInsta/imgInsta5.jpg';

const Home = () => {
  return (
    <div>
      <Hero
        igImages={[imgInsta1, imgInsta2, imgInsta3, imgInsta4, imgInsta5,]}
      />
      <div className="mt-20">
        <FeaturedProducts />
      </div>
      <InfoSection />
      <ContactForm />
    </div>
  );
};

export default Home;
