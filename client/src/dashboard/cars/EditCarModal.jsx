import React, { useState, useEffect } from 'react';

export const EditCarModal = ({ car, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(car);

  useEffect(() => {
    setFormData(car);
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className={`fixed pt-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex overflow-y-auto items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modifier la Voiture</h2>
        <form onSubmit={handleSubmit}>

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
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Enregistrer les modifications
            </button>
            <button type="button" onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


