import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';


export const ServiceDel = () => {

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/services`, {
        withCredentials: true,
      });
      setServices(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/api/services/${serviceId}`, {
        withCredentials: true,
      });
      // mise à jour de la liste des services après la suppression
      setServices(services.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error('Erreur lors de la suppression du service :', error);
    }
  };

  const handleRefresh = () => {
    fetchServices();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Effacer un service</h2>
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mb-4"
        onClick={handleRefresh}
      >
        Rafraîchir
      </button>
      <div className="mb-2 border-b border-gray-300"></div>
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
      <div className="mb-2 border-b border-gray-300"></div>
    </div>
  );
};


