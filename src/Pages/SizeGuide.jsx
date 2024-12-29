import React from 'react';

const SizeGuide = () => {
  const classicSizes = [
    { talle: '1', ancho: '48', alto: '64', size: 'S' },
    { talle: '2', ancho: '50', alto: '67', size: 'M' },
    { talle: '3', ancho: '52.5', alto: '69', size: 'L' },
    { talle: '4', ancho: '55', alto: '71', size: 'XL' },
    { talle: '5', ancho: '57.5', alto: '74', size: 'XXL' },
    { talle: '6', ancho: '60', alto: '76', size: 'XXXL' }
  ];

  const oversizeSizes = [
    { talle: '1', ancho: '53', alto: '69', size: 'S' },
    { talle: '2', ancho: '55.5', alto: '71', size: 'M' },
    { talle: '3', ancho: '57', alto: '74.4', size: 'L' },
    { talle: '4', ancho: '59', alto: '75.5', size: 'XL' },
    { talle: '5', ancho: '62', alto: '77', size: 'XXL' }
  ];

  const Table = ({ title, sizes }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-4 py-2">Talle</th>
              <th className="px-4 py-2">Tamaño</th>
              <th className="px-4 py-2">Ancho (cm)</th>
              <th className="px-4 py-2">Alto (cm)</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } text-gray-700`}
              >
                <td className="px-4 py-2">{size.talle}</td>
                <td className="px-4 py-2">{size.size}</td>
                <td className="px-4 py-2">{size.ancho}</td>
                <td className="px-4 py-2">{size.alto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Todas las medidas son aproximadas y están expresadas en centímetros.
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center font-bignoodle">
        Guía de Talles
      </h1>
      <Table title="Remera Oversize" sizes={oversizeSizes} />
      <Table title="Remera Clásica" sizes={classicSizes} />
    </div>
  );
};

export default SizeGuide;
