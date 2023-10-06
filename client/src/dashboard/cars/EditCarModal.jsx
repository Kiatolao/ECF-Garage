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
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modifier la Voiture</h2>
        <form onSubmit={handleSubmit}>

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


