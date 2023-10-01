import React, { useState } from 'react';
import axios from 'axios';

export function Contact() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    message: '',
    object: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/messages', formData, {
        withCredentials: true, // Ajoutez cette option pour inclure les cookies
      });
      // Réinitialisez le formulaire après l'envoi réussi
      setFormData({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        message: '',
        object: '',
      });
      alert('Message envoyé avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la voiture :', err.response ? err.response.data : err.message);
      alert('Une erreur s\'est produite lors de l\'envoi du message.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="object" className="block text-gray-600">Objet :</label>
          <input
            type="text"
            id="object"
            name="object"
            value={formData.object}
            onChange={handleChange}
            className="w-full border rounded  px-3"

          />
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
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded  hover:bg-blue-600"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}


