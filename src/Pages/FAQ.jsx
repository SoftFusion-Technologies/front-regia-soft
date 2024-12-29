import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: '¿Como comprar?',
      answer:
        'Selecciona cualquiera de nuestros productos, eligiendo el talle y el color. Luego, agrega el artículo al carrito y finaliza la compra. Al completar el proceso, serás redirigido a nuestro WhatsApp con el detalle de tu compra.'
    },
    {
      question: '¿Cuál es el monto mínimo de compra?',
      answer: 'No tenemos mínimo de compra.'
    },
    {
      question: '¿Cómo puedo ver los precios?',
      answer: 'Todos los precios figuran en la web.'
    },
    {
      question: 'Después de la compra, ¿puede ocurrir que no haya stock?',
      answer:
        'Es inusual, pero en el caso que ocurra, no te preocupes que una persona de nuestro equipo se contactará con vos para brindarte una solución favorable.'
    },
    {
      question: '¿Cuáles son los medios de pago?',
      answer:
        'Los métodos de pago que tenemos disponibles son: 1- Transferencia o Depósito en nuestra web.'
    },
    {
      question: '¿Hacen envíos?',
      answer:
        'Sí, hacemos envíos a todo el país mediante Correo Argentino Envío a domicilio o a sucursal.'
    },
    {
      question: '¿Se puede retirar por sucursal?',
      answer: 'Actualmente no contamos más con punto de retiro, solo envíos.'
    },
    {
      question:
        '¿Se pueden utilizar las fotos de la página para mostrar los productos?',
      answer: 'Sí, podés utilizar las fotos que desees.'
    },
    {
      question: 'Ya realicé el pedido. ¿Por dónde me contactan?',
      answer:
        'Una vez que el pedido ingresa al sistema, nos comunicamos a la brevedad a través de Whatsapp para continuar con el proceso de compra. En caso de no obtener mensaje, comunicate al 3863531891 indicando tu número de orden. Por eso es importante que llenes correctamente el formulario.'
    },
    {
      question: '¿Cuánto se demora en armar el pedido?',
      answer:
        'El armado puede demorar hasta 12 horas los días hábiles, si la compra fue realizada fines de semana, el pedido se arma el siguiente día hábil.'
    },
    {
      question: '¿Cuánto tiempo tengo para abonar?',
      answer:
        'Tenés 1 día corrido (24 hs) para abonar el pedido. De lo contrario, procedemos a la cancelación del mismo, perdiendo la reserva de las prendas.'
    },
    {
      question: '¿Cuánto demora en llegar mi pedido?',
      answer:
        'El tiempo depende de la distancia a recorrer y el método de envío que hayas seleccionado. Por expresos/transporte suele demorar entre 2 a 7 días hábiles aprox. dependiendo del transporte (es un estimado). Por Correo Argentino entre 5 a 7 días hábiles.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center font-bignoodle">
        Preguntas Frecuentes
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <button
              className="w-full text-left px-6 py-4 text-lg font-semibold text-gray-800 bg-gradient-to-r from-orange-400 to-yellow-500 hover:bg-gradient-to-l focus:outline-none transition-colors duration-200"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center justify-between">
                <span>{faq.question}</span>
                <span>
                  {activeIndex === index ? (
                    <AiOutlineMinus className="text-white text-xl" />
                  ) : (
                    <AiOutlinePlus className="text-white text-xl" />
                  )}
                </span>
              </div>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 text-gray-600 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
