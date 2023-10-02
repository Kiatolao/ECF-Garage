import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  // Mise en place du state pour les champs de formulaire et les messages d'erreur
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Gestion des changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données du formulaire 
      const response = await axios.post('http://localhost:8000/api/auth/register', formData, {
      withCredentials: true, 
    });

      // Réinitialisation des champs du formulaire et affichage d'un message de succès
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      setSuccessMessage(response.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    }
  };

  return (
    <div className="max-w-md  mt-10">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded px-3"
            autoComplete='new-username'
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Adresse e-mail :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3"
            autoComplete='new-email'
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3"
            autoComplete='new-password'
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600"
        >
          S'inscrire
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};
