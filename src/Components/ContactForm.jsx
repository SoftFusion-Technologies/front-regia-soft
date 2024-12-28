import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Configura el servicio de EmailJS
    emailjs
      .send(
        'service_id', // Reemplaza con tu ID de servicio de EmailJS
        'template_id', // Reemplaza con tu ID de plantilla de EmailJS
        formData,
        'user_id' // Reemplaza con tu ID de usuario de EmailJS
      )
      .then(
        (response) => {
          setStatus('¡Mensaje enviado con éxito!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus('Hubo un error al enviar el mensaje.');
        }
      );
  };

  return (
    <section id="contacto" className="contact-form-section py-16 px-4 sm:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8 text-black font-bignoodle">
          Ponte en contacto con nosotros
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-left font-semibold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-left font-semibold mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-left font-semibold mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition"
          >
            Enviar Mensaje
          </button>
        </form>

        {status && <p className="mt-4 text-lg">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
