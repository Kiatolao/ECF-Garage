import React, { useState } from 'react';
import axios from 'axios';
import DOMpurify from 'isomorphic-dompurify';


export const Register = () => {
  // state des champs de formulaire
  const [formData, setFormData] = useState({
    username: DOMpurify.sanitize(''),
    email: DOMpurify.sanitize(''),
    password: DOMpurify.sanitize(''),
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // gestion des changements form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecf-garage-server.vercel.app/api/auth/register', formData, {
      withCredentials: true, 
    });

      // réinitialisation des champs du formulaire et affichage d'un message de succès
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
    <div className="w-[350px] ">
      <h2 className="text-xl font-bold mb-4">Ajouter un employé</h2>
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
            className="border border-gray-400 w-full"
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
            className="border border-gray-400 w-full"
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
            className="border border-gray-400 w-full"
            autoComplete='new-password'
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600"
        >
          Enregistrer un employé
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};
