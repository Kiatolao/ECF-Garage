import React, { useState } from 'react';
import axios from 'axios';

export const CarContactForm = ({ carTitle }) => {
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
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
    }
  };

  return (
    <div className="p-4 border">
      <h2 className="text-2xl mb-4">Formulaire de contact</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
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
        <div>
          <label htmlFor="phone" className="block">Téléphone :</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-21w-full"/>
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
            className="border border-gray-300 p-1 w-full"/>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Envoyer</button>
      </form>
    </div>
  );
};