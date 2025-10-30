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

// video vertical (mobile).
import heroVertical from '../Videos/hero-vertical.mp4';

const Home = () => {
  return (
    <div>
      <Hero
        igImages={[imgInsta1, imgInsta2, imgInsta3, imgInsta4, imgInsta5]}
        mobileVideoSrc={heroVertical}
        mobileVideoPoster={imgInsta1}
      />
      <div className="mt-20">
        <FeaturedProducts />
      </div>
      <InfoSection
        whatsappNumber="+54 9 3812 472636"
        whatsappMessage="Hola Regia 👋 Vi la nueva colección y quiero consultar por talles."
        shippingText="Envíos a todo el país"
        shippingBadge="Retiro en tienda sin costo"
        payments={[
          'Transferencia',
          'Efectivo',
          'Débito',
          'Crédito',
          '3 cuotas sin interés'
        ]}
        address="Monteros, Tucumán"
        gmapsLink="https://maps.google.com/?q=Regia%20Monteros%20Tucum%C3%A1n"
      />
      <ContactForm />
    </div>
  );
};

export default Home;
