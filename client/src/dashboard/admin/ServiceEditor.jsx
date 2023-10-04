import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ServiceEditor = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);


    useEffect(() => {
        // Charger les services depuis l'API
        async function fetchServices() {
          try {
            const response = await axios.get('http://localhost:8000/api/services');
            setServices(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des services :', error);
          }
        }
    
        fetchServices();
      }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleSave = async () => {
    if (selectedService) {
      try {
        await axios.put(`http/localhost:8000/api/services/${selectedService.id}`, selectedService);
        console.log('Le service a été mis à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du service :', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Édition de Service</h2>
      <div className="mb-4">
        <label className="block font-semibold">Sélectionnez un service :</label>
        <select
          onChange={(e) => handleServiceSelect(JSON.parse(e.target.value))}
          className="w-full border p-2 rounded shadow-md"
        >
          <option value="">Sélectionnez un service</option>
          {services.map((service) => (
            <option key={service.id} value={JSON.stringify(service)}>
              {service.service}
            </option>
          ))}
        </select>
      </div>
      {selectedService && (
        <div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
};


