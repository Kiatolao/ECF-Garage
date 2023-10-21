import React, { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';


export const CarContactForm = ({ carTitle }) => {

  const [submissionStatus, setSubmissionStatus] = useState('');  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    object: carTitle,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    await axios.post('http://localhost:8000/api/messages', formData, {
        withCredentials: true, 
      }); 
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        object: carTitle,
      });
      setSubmissionStatus('Le témoignage a été envoyé avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      setSubmissionStatus('Une erreur s\'est produite lors de l\'envoi du témoignage.');
    }
  };

  return (
    <div className="p-4 border border-neutral-300 bg-white shadow rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-2xl mb-4">Contactez nous à propos de ce véhicule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
                <label htmlFor="firstName" className="block">Prénom :</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 w-full"/>
                </div>
                <div>
                <label htmlFor="lastName" className="block">Nom :</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 w-full"/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <label htmlFor="email" className="block">Email :</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-1 w-full"/>
            </div>
            <div className="">
            <label htmlFor="phone" className="block">Téléphone :</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-1 w-full"/>
            </div>
            </div>
        <div>
          <label htmlFor="object" className="block">Objet :</label>
          <input
            type="text"
            id="object"
            name="object"
            value={formData.object}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full"/>
        </div>
        <div>
          <label htmlFor="message" className="block">Message :</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full h-[175px]"/>
        </div>
        {submissionStatus && <p className="text-green-500 mt-2 mb-2">{submissionStatus}</p>}
        <button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded w-full">Envoyer</button>
      </form>
      </div>
      <div className="">
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
    </div>
  );
};