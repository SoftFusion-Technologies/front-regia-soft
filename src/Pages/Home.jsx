import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import FeaturedProducts from './FeaturedProducts';
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className='mt-20'>
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
