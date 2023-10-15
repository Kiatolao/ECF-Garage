import React, { useState } from 'react';
import axios from 'axios';


export const AddCar = () => {

  const [formData, setFormData] = useState({
    title: '',
    year: '',
    price: '',
    km: '',
    desc: '',
    fuel: '',
    gearbox: '',
    warrant: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // Gérer correctement le champ de fichier
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await uploadImage(formData.file);

    try {
      await axios.post('http://localhost:8000/api/cars/', {
        ...formData,
        image: formData.file ? imgUrl : '',
      }, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la voiture :', err.response ? err.response.data : err.message);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      console.error('Erreur lors de l\'upload de l\'image :', err);
    }
  };

  return (
    <div className="max-w-xl p-4 bg-white">
      <h1 className="font-bold text-lg mb-4">Créer une Nouvelle Voiture</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2">Image de la Voiture</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Modèle de la Voiture</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block mb-2">Année</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">Prix (en €)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="km" className="block mb-2">Kilomètres (en km)</label>
          <input
            type="number"
            id="km"
            name="km"
            value={formData.km}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block mb-2">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="fuel" className="block mb-2">Type de Carburant</label>
          <select
            id="fuel"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full p-1"
          >
            <option value="">Sélectionnez un carburant</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride">Hybride</option>
            <option value="Electrique">Electrique</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="gearbox" className="block mb-2">Boîte de Vitesses</label>
          <select
            id="gearbox"
            name="gearbox"
            value={formData.gearbox}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full p-1"
          >
            <option value="">Sélectionnez une transmission</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Auto">Automatique</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="warrant" className="block mb-2">Garantie (en mois)</label>
          <input
            type="number"
            id="warrant"
            name="warrant"
            value={formData.warrant}
            onChange={handleChange}
            required
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Ajouter la Voiture
          </button>
        </div>
      </form>
    </div>

  );
};


