import React, { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire au backend (Express) pour traitement
    // Vous pouvez utiliser Axios ou une autre bibliothèque pour cela
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-600">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border rounded px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block text-gray-600">Prénom :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
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
          <label htmlFor="telephone" className="block text-gray-600">Numéro de téléphone :</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border rounded  px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="block text-gray-600">Objet :</label>
          <input
            type="text"
            id="object"
            name="tobject"
            value=""
            onChange={handleChange}
            className="w-full border rounded  px-3"
            required
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


