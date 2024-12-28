import React from 'react';

const PostHero = () => {
  return (
    <div className="font-bignoodle absolute -mt-60 md:-mt-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-black z-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold uppercase">Corsa Nera</h1>
        <p className="text-xl">
          La mejor tienda de ropa con estilo y elegancia
        </p>
        <button className="text-lg px-8 py-3 bg-black text-white rounded-lg border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition duration-300">
          Ver productos
        </button>
      </div>
    </div>
  );
};

export default PostHero;
