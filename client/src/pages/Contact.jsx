import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import layer from '../assets/layer.jpg';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export function Contact() {

  const currentDate = new Date();
  // récupération de l'objet du message dans l'url
  const location = useLocation();
  const objectFromUrl = new URLSearchParams(location.search).get('object');

  const initialFormData = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    message: '',
    // recupere l'objet du message dans l'url
    object: objectFromUrl || '',
    date: currentDate,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/messages', formData, {
        withCredentials: true, 
      });
      // Réinitialisez le formulaire après l'envoi réussi
      setFormData({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        message: '',
        object: '',
        date: '',
      });
      alert('Message envoyé avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la voiture :', err.response ? err.response.data : err.message);
      alert('Une erreur s\'est produite lors de l\'envoi du message.');
    }
  };

  return (
    <>
        <div>
    <img src={layer} alt="Moteur" className="h-[80px] w-full bg-cover shadow-xl bg-opacity-80"/>
      <div className="flex-grow border-t border-black"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-5 p-5">
      <div>
        <h2 className="text-xl font-bold mb-4 text-neutral-700">Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3"
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded  px-3"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded  px-3"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600">Numéro de téléphone :</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded  px-3"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="object" className="block text-gray-600">Objet :</label>
          <input
            type="text"
            id="object"
            name="object"
            value={formData.object || ''}
            onChange={handleChange}
            className="w-full border rounded  px-3"/>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-600">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
            rows="4"
            required>
            </textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded  hover:bg-blue-600">
          Envoyer
        </button>
      </form>
    </div>
    <div>
        <div className="border rounded p-4 mb-4 text-neutral-700">
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" size={20} />
            <h2 className="text-xl font-bold ">Par téléphone</h2>
          </div>
          <p>010203040506</p>
        </div>
        <div className="border rounded p-4 text-neutral-700 mb-4">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" size={20} />
            <h2 className="text-xl font-bold">Nos locaux</h2>
          </div>
          <p>
            17 rue Nowhere<br />
            Fougères
            35300
          </p>
        </div>
        <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42423.72584773053!2d-1.1953339499999998!3d48.35124450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48093778fd795953%3A0x6531938abaecd607!2s35133%20Foug%C3%A8res!5e0!3m2!1sfr!2sfr!4v1697717732880!5m2!1sfr!2sfr"
          title="Google Maps"
          width="100%"
          height="265"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">        
          </iframe>
        </div>
      </div>
    </div>
    </>
  );
}