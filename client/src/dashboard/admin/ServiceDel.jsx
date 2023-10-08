import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';

export const ServiceDel = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // fetch des services
    async function fetchServices() {
      try {
        const response = await axios.get('http://localhost:8000/api/services', {
          withCredentials: true,
        });
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des services :', error);
      }
    }

    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8000/api/services/${serviceId}`, {
        withCredentials: true,
      });
      // mise à jour de la liste des services après la suppression
      setServices(services.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error('Erreur lors de la suppression du service :', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Effacer un service</h2>
      <div className="flex flex-wrap">
        {services.map((service) => (
        <button
        key={service.id}
        onClick={() => handleDeleteService(service.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2 mb-2 flex items-center"
      >
        {service.service}
        <MdOutlineCancel className="ml-2" /> {/* Icône Material Icons */}
      </button>
        ))}
      </div>
    </div>
  );
};


